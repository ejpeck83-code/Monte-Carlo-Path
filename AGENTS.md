# AGENTS.md — Pathway Simulator MVP

These instructions are mandatory for Codex or any coding agent working in this repository.

## Mission
Build a local/demo MVP that helps community college leaders, advisors, and deans simulate how degree maps, course sequencing, prerequisites, course availability, and student constraints affect completion probability, stopout probability, average terms to completion, and bottleneck risk.

## Non-negotiable domain rule
The Ivy Tech public program-course workbook must not be interpreted as a flat list of required courses.

Many rows represent requirement groups, elective buckets, course options, wildcard patterns, concentration choices, or choose-one/choose-many requirements. The simulator must model programs as `requirementGroups` with `options`.

Do **not** build the pathway engine around a simple `requiredCourseIds: string[]` model except as a derived convenience for explicitly required single-course groups.

## Anti-requirement
Do not implement program completion like this:

```ts
program.requiredCourseIds.every(courseId => completedCourses.includes(courseId))
```

That is incorrect because course options inside the same requirement group are alternatives, not all mandatory requirements.

## Required architecture
Each `ProgramCatalog` must include:

- program identity and credential metadata,
- total credits/hours,
- requirement groups,
- source workbook metadata,
- rows needing review.

Each `RequirementGroup` must include:

- a group id,
- group label,
- requirement type,
- minimum courses and/or minimum credits,
- options,
- source row references,
- review status.

Each `RequirementOption` must include:

- option id,
- course code or wildcard pattern,
- credits,
- title when available,
- flags for exact course vs wildcard vs ambiguous option.

## Required functions
Implement and test these functions before UI work:

- `normalizeProgramCatalog(...)`
- `classifyRequirementRow(...)`
- `groupRequirementRows(...)`
- `isRequirementGroupSatisfied(...)`
- `getRemainingRequirements(...)`
- `getEligibleCourses(...)`
- `generateScheduleOptions(...)`
- `runPathwaySimulation(...)`
- `identifyBottlenecks(...)`
- `generateRecommendationSummary(...)`

## Tests are required before UI polish
Add tests proving:

1. A choose-one math group is satisfied by one completed option.
2. A humanities elective bucket is satisfied by any approved course or enough approved credits.
3. A student can complete a program without completing every option listed in every group.
4. Schedule generation chooses among group options rather than scheduling all options.
5. Wildcard/ambiguous rows are flagged as `unknown_requires_review` or `wildcard_pattern`.
6. Completion logic evaluates group satisfaction, not flat course-row completion.

## Simulation framing
Use Monte Carlo simulation for the MVP. Structure code so Monte Carlo Tree Search can be added later.

Each simulation should:

1. Start from an academic state and student profile.
2. Determine remaining unsatisfied requirement groups.
3. Identify eligible course options based on prerequisites, offerings, modality, and term availability.
4. Generate schedule actions.
5. Simulate pass/fail/withdraw outcomes.
6. Update student state.
7. Continue until completion, stopout, or maximum term limit.

## Privacy and ethics
Use fictional/demo data only. Do not add real student records. Do not implement individual student risk scores. Do not use the app to deny services or opportunities.

Add visible language in the app:

> This MVP uses fictional/demo data only. It is designed to support pathway design, advising strategy, and schedule planning. It should not be used to make high-stakes decisions about individual students.

## Preferred stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- Local JSON data or SQLite for MVP
- Vitest or Jest for tests
- Recharts for basic charts

## UX tone
The UI should feel like an executive/advisor decision-support dashboard. Use plain language, show rationale, and emphasize system barriers and pathway redesign rather than student labeling.
