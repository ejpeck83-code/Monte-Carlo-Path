# Data Ingestion Spec — Ivy Tech Program-Course Workbook

## Source file
`data/program courses.xlsx`

This workbook is public program-course/curriculum data. It should be used as the catalog and degree-requirement layer.

## What this data provides
The workbook can support:

- program names,
- degree/program codes,
- degree hours,
- requirement categories,
- sub-requirements,
- course options,
- course-hour metadata,
- some course-related metadata.

## What this data does not provide
The workbook should not be treated as student outcome data. It does not provide:

- student completion outcomes,
- individual student records,
- grades,
- withdrawals,
- stopout outcomes,
- actual term-by-term student sequences,
- FERPA-protected student data.

Use fictional/demo student profiles and fictionalized course outcome probabilities in the MVP.

## Ingestion goal
Create a normalized catalog output shaped like:

```ts
type ProgramCatalog = {
  programId: string;
  programName: string;
  credentialType: string;
  totalCredits: number;
  requirementGroups: RequirementGroup[];
  source: {
    workbookName: string;
    importedAt: string;
    sourceSheetNames: string[];
  };
  rowsNeedingReview: CatalogReviewIssue[];
};
```

## Required ingestion pipeline

### Step 1: Inspect workbook structure
Load the workbook and identify sheets, headers, and likely columns for:

- program identifier,
- program name,
- credential type,
- degree hours,
- requirement category,
- subrequirement,
- course code,
- course title,
- credit hours,
- course notes/options.

### Step 2: Normalize course codes
Normalize course identifiers into a consistent format:

```txt
SUBJ 123
SUBJ 123XX
SUBJ ### wildcard
```

Keep the raw source value in the normalized record.

### Step 3: Classify requirement rows
Each workbook row should be classified as one of:

- `required_course`
- `choose_n_courses`
- `choose_n_credits`
- `elective_bucket`
- `wildcard_pattern`
- `concentration_or_track`
- `unknown_requires_review`

### Step 4: Group rows into requirement groups
Rows that represent options within the same requirement should be grouped together.

Examples:

- Choose 1 of MATH 123 or MATH 135.
- Complete 3 credits from Humanities.
- Complete one approved social science elective.
- Select one track or concentration option.

### Step 5: Preserve source traceability
Every normalized requirement group and option should include source workbook row numbers and raw values.

This is essential because ambiguous catalog rows must be reviewable.

### Step 6: Create review queue
Any row that cannot be confidently classified should be added to `rowsNeedingReview` with:

- program id,
- source sheet,
- source row,
- raw values,
- reason,
- suggested classification if available.

## Do not overfit first pass
The MVP can use conservative classification. It is better to flag uncertain rows for review than to incorrectly mark an elective as mandatory.

## Completion logic dependency
Catalog ingestion is successful only if the output supports requirement-group satisfaction, not flat course checklist completion.
