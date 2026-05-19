# Requirement Groups Spec — Non-Negotiable Design Rule

## Core rule
The simulator must not treat each course row in the Ivy Tech public program-course workbook as a mandatory course.

Many rows are options inside a requirement. If the model flattens them, it will dramatically overstate what students need to complete and produce invalid simulation results.

## Correct mental model
A program is made of requirement groups.

A requirement group may be:

- one required course,
- choose one course from several options,
- choose multiple courses from a list,
- complete a minimum number of credits from a category,
- complete a wildcard requirement,
- complete a concentration/track requirement,
- ambiguous and needing manual review.

## Example
Incorrect model:

```ts
requiredCourseIds: ["MATH 123", "MATH 135", "MATH 136"]
```

Correct model:

```ts
{
  id: "math-requirement",
  label: "Mathematics Requirement",
  requirementType: "choose_n_courses",
  minCourses: 1,
  options: [
    { courseCode: "MATH 123", credits: 3 },
    { courseCode: "MATH 135", credits: 3 },
    { courseCode: "MATH 136", credits: 3 }
  ]
}
```

## Required satisfaction logic
Implement:

```ts
isRequirementGroupSatisfied(group, completedCourses)
```

The function must evaluate group type.

### Required course
Satisfied if the required exact course is completed.

### Choose N courses
Satisfied if the completed courses include at least `minCourses` from the group's options.

### Choose N credits
Satisfied if completed approved options total at least `minCredits`.

### Elective bucket
Satisfied if completed courses match approved options, wildcard patterns, or category rules and meet course/credit minimums.

### Wildcard pattern
Satisfied if completed courses match the wildcard pattern and meet course/credit minimums.

### Concentration or track
Satisfied if one valid track or concentration path is satisfied.

### Unknown requires review
Should not be silently treated as mandatory. Flag it for review and do not produce authoritative completion claims.

## Schedule generation rule
Schedule generation must choose among valid options. It must not schedule every course option in a group.

## Simulation rule
A student can complete the simulated program without completing every course option listed in the catalog.

## Required tests
Add tests proving:

1. A choose-one math group is satisfied by one option.
2. A 3-credit humanities elective group is satisfied by one approved 3-credit course.
3. A group with three options does not require all three options.
4. Wildcard rows are flagged and handled separately.
5. Unknown rows appear in review output.
6. Simulation completion is based on satisfied groups.
