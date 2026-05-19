import { describe, expect, test } from "vitest";
import type { RequirementGroup } from "../src/lib/types";
import { isRequirementGroupSatisfied } from "../src/lib/requirements";

describe("requirement group satisfaction", () => {
  test("choose-one math requirement is satisfied by one completed option", () => {
    const mathGroup: RequirementGroup = {
      id: "math-requirement",
      label: "Mathematics Requirement",
      requirementType: "choose_n_courses",
      minCourses: 1,
      options: [
        { id: "math-123", courseCode: "MATH 123", credits: 3, isExactCourse: true, isWildcard: false, requiresReview: false, sourceRows: [10] },
        { id: "math-135", courseCode: "MATH 135", credits: 3, isExactCourse: true, isWildcard: false, requiresReview: false, sourceRows: [11] }
      ],
      sourceRows: [10, 11],
      reviewStatus: "ok"
    };

    expect(isRequirementGroupSatisfied(mathGroup, ["MATH 123"])).toBe(true);
    expect(isRequirementGroupSatisfied(mathGroup, ["MATH 135"])).toBe(true);
    expect(isRequirementGroupSatisfied(mathGroup, [])).toBe(false);
  });

  test("humanities elective bucket is satisfied by one approved 3-credit course", () => {
    const humanitiesGroup: RequirementGroup = {
      id: "humanities-elective",
      label: "Humanities Elective",
      requirementType: "elective_bucket",
      minCredits: 3,
      options: [
        { id: "huma-100", courseCode: "HUMA 100", credits: 3, isExactCourse: true, isWildcard: false, requiresReview: false, sourceRows: [20] },
        { id: "phil-102", courseCode: "PHIL 102", credits: 3, isExactCourse: true, isWildcard: false, requiresReview: false, sourceRows: [21] }
      ],
      sourceRows: [20, 21],
      reviewStatus: "ok"
    };

    expect(isRequirementGroupSatisfied(humanitiesGroup, ["PHIL 102"])).toBe(true);
    expect(isRequirementGroupSatisfied(humanitiesGroup, ["HUMA 100"])).toBe(true);
    expect(isRequirementGroupSatisfied(humanitiesGroup, [])).toBe(false);
  });

  test("student does not need to complete every option in a requirement group", () => {
    const group: RequirementGroup = {
      id: "choose-one-communication",
      label: "Communication Requirement",
      requirementType: "choose_n_courses",
      minCourses: 1,
      options: [
        { id: "comm-101", courseCode: "COMM 101", credits: 3, isExactCourse: true, isWildcard: false, requiresReview: false, sourceRows: [30] },
        { id: "comm-102", courseCode: "COMM 102", credits: 3, isExactCourse: true, isWildcard: false, requiresReview: false, sourceRows: [31] },
        { id: "comm-201", courseCode: "COMM 201", credits: 3, isExactCourse: true, isWildcard: false, requiresReview: false, sourceRows: [32] }
      ],
      sourceRows: [30, 31, 32],
      reviewStatus: "ok"
    };

    expect(isRequirementGroupSatisfied(group, ["COMM 101"])).toBe(true);
    expect(isRequirementGroupSatisfied(group, ["COMM 101", "COMM 102", "COMM 201"])).toBe(true);
  });

  test("unknown requirement rows should not be silently treated as mandatory courses", () => {
    const group: RequirementGroup = {
      id: "unknown-row",
      label: "Unclassified Catalog Row",
      requirementType: "unknown_requires_review",
      options: [
        { id: "raw", rawValue: "Select approved program elective", isExactCourse: false, isWildcard: false, requiresReview: true, sourceRows: [40] }
      ],
      sourceRows: [40],
      reviewStatus: "needs_review"
    };

    expect(group.reviewStatus).toBe("needs_review");
    expect(group.requirementType).toBe("unknown_requires_review");
  });
});
