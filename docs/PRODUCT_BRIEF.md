# Product Brief — Pathway Simulator MVP

## Concept
Community college student success is shaped by sequences of course-taking, scheduling, advising, and life-context decisions. A single course choice can preserve momentum or create a future bottleneck. This MVP uses pathway simulation to help colleges identify which course sequences, schedule conditions, and advising choices most reliably preserve student momentum toward completion.

## Product framing
This is not a tool for predicting whether a student will fail. It is a tool for identifying system barriers and better academic routes.

The core question is:

> Are students being asked to navigate degree pathways that are mathematically possible on paper but operationally fragile in real life?

## Primary users

- Campus leaders
- Advising leaders
- Academic deans
- Faculty leads
- Structured scheduling teams
- Student-success/retention teams

## MVP user story
As a campus leader or advisor, I want to simulate how different course-taking sequences affect completion probability so that we can improve advising, structured scheduling, and pathway design.

## MVP screens

### 1. Dashboard
Show:
- programs available,
- total required credits,
- number of requirement groups,
- known bottleneck courses,
- average simulated completion probability,
- average simulated terms to completion.

### 2. Program Pathway View
For a selected program, display:
- requirement groups,
- course options inside each group,
- prerequisite relationships when available,
- recommended term sequence when available,
- course frequency,
- modality availability,
- bottleneck flags,
- rows needing review.

### 3. Student Profile Simulator
Allow the user to select or edit:
- program,
- completed courses,
- starting credits,
- full-time/part-time status,
- max credits per term,
- preferred modality,
- available terms,
- work/life constraint level,
- prior academic risk level.

Use fictional/demo student profiles only.

### 4. Simulation Results
After running simulations, show:
- estimated completion probability,
- estimated stopout probability,
- average terms to completion,
- most common successful pathways,
- most common stopout/delay points,
- bottleneck courses,
- recommended next-term schedule options.

### 5. Recommendation Summary
Generate a plain-language summary for advisors and leaders.

Example:

> For this student profile, the strongest first-term schedule is IVYT 111 + ENGL 111 + Program Intro Course. This sequence preserves the most future pathway options and avoids delaying the prerequisite chain. The highest bottleneck risk is MATH 123, which appears in 42% of delayed or stopped simulations.

## What the MVP should answer

- Which first-term course combinations most often preserve completion momentum?
- Which courses function as hidden bottlenecks?
- Which degree maps are fragile for part-time students?
- Which course offerings create schedule dead zones?
- Which recommended schedules leave the most recovery options if a student fails or withdraws?

## COO-level value
The tool supports better system design:

- Advising: identify next best academic move.
- Structured scheduling: test whether real course offerings support intended maps.
- Retention: find recoverable momentum points.
- Academic planning: identify high-leverage bottleneck courses.
- Resource allocation: target tutoring, course refresh, modality changes, and section availability where they affect completion most.
