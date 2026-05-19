# Acceptance Criteria

## Functional criteria

The MVP is complete when:

1. App runs locally with `npm install` and `npm run dev`.
2. User can select a program.
3. User can view requirement groups and course options.
4. User can select or edit a fictional/demo student profile.
5. User can run at least 1,000 pathway simulations from the UI.
6. Results display:
   - completion probability,
   - stopout probability,
   - average terms to completion,
   - average credits earned,
   - bottleneck courses,
   - at least three recommended next-term schedules.
7. Bottlenecks are ranked by frequency.
8. Recommendation summary is plain-language and executive/advisor friendly.
9. App uses only fictional/demo student data.
10. Code is typed, organized, documented, and tested.

## Data-model criteria

1. Program requirements are modeled as `requirementGroups`.
2. Requirement groups contain `options`.
3. Completion logic evaluates requirement-group satisfaction.
4. The engine does not require every catalog row/course option to be completed.
5. Ambiguous catalog rows are flagged for review.
6. Wildcard patterns are preserved and not misclassified as exact courses.

## Required tests

Add tests proving:

1. Choose-one math requirement is satisfied by one completed option.
2. Humanities elective bucket is satisfied by one approved course or enough approved credits.
3. Student can complete a program without completing every option listed in every group.
4. Schedule generation chooses among options rather than scheduling every option.
5. Wildcard or ambiguous rows are flagged for review.
6. Completion logic does not use a flat `requiredCourseIds.every(...)` checklist.

## UI language criteria

Use:

- pathway resilience,
- completion probability,
- bottleneck risk,
- momentum preservation,
- recovery options,
- schedule fragility.

Avoid:

- dropout prediction,
- student risk score,
- likely failure,
- at-risk student label.

## Stretch goal

After MVP, add a true Monte Carlo Tree Search module:

- academic state = node,
- schedule action = edge/action,
- UCB1 for selection,
- expansion of schedule options,
- rollout using Monte Carlo simulation,
- backpropagation of rewards,
- reward function prioritizing completion, shorter time to completion, credit momentum, and avoidance of bottleneck dead ends.
