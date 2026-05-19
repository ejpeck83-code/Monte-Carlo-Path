# Data Folder

This folder contains demo/normalized catalog data for the Pathway Simulator MVP.

## Included

- `program_catalog_sample.json` — a lightweight normalized sample showing the required `requirementGroups` and `options` structure.

## Source workbook note

The original Ivy Tech public program-course workbook from the handoff package is approximately 14 MB. It should be added manually to this folder as:

```txt
data/program courses.xlsx
```

The ingestion code should be written to support that workbook, but Codex should not require real student-level data to build the MVP.

## Critical rule

Do not treat the workbook as a flat checklist of mandatory courses. The workbook contains requirement buckets, electives, options, wildcard patterns, and rows requiring review.
