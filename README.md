# Monte Carlo Pathway Simulator MVP

This repository is a clean Codex handoff package for building a community college pathway simulation MVP.

The product concept is a decision-support tool that uses Monte Carlo simulation first, and later Monte Carlo Tree Search, to evaluate how degree requirements, course sequencing, prerequisite chains, course availability, modality, and student constraints affect completion probability, stopout probability, bottleneck risk, and recovery options.

## Start Here

1. Read `AGENTS.md`.
2. Read `prompts/CODEX_MASTER_TASK.txt`.
3. Use `docs/REQUIREMENT_GROUPS_SPEC.md` as a non-negotiable domain rule.
4. Use `schema/types.ts` as the target TypeScript model.
5. Use `tests/requirementGroups.spec.ts` as the first implementation test target.

## Critical Domain Rule

The Ivy Tech program-course workbook must not be treated as a flat list of mandatory courses.

Many rows represent requirement groups, elective buckets, math choices, humanities/social science choices, wildcard course patterns, concentrations, or choose-one/choose-many options. The simulator must model programs as requirement groups with options.

Incorrect model:

```ts
program.requiredCourseIds.every(courseId => completedCourses.includes(courseId))
```

Correct model:

```ts
program.requirementGroups.every(group => isRequirementGroupSatisfied(group, completedCourses))
```

## MVP Goal

Build a local/demo web app where a user can select a program, choose or edit a student profile, run simulations, and see:

- completion probability
- stopout probability
- average terms to completion
- bottleneck courses
- recommended next-term schedule options
- plain-language recommendation summary

## Recommended Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- Local JSON/demo data for MVP

## Data Safety

Use fictional, public, or de-identified data only. Do not include real student records. The tool is for pathway improvement, structured scheduling, and advising support — not automated student labeling.
