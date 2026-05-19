export type TermName = "Fall" | "Spring" | "Summer";
export type Modality = "Online" | "Face-to-Face" | "Hybrid";
export type Location = "Muncie" | "Portland/Jay County" | "Online" | "Other";

export type RequirementType =
  | "required_course"
  | "choose_n_courses"
  | "choose_n_credits"
  | "elective_bucket"
  | "wildcard_pattern"
  | "concentration_or_track"
  | "unknown_requires_review";

export type CourseOutcome = "pass" | "fail" | "withdraw";

export type CourseRiskProfile = {
  passProbability: number;
  failProbability: number;
  withdrawProbability: number;
};

export type Course = {
  id: string;
  code: string;
  title: string;
  credits: number;
  prerequisites: string[];
  isGateway: boolean;
  isBottleneck: boolean;
  riskProfile: CourseRiskProfile;
};

export type RequirementOption = {
  id: string;
  courseCode?: string;
  courseTitle?: string;
  credits?: number;
  wildcardPattern?: string;
  category?: string;
  rawValue?: string;
  isExactCourse: boolean;
  isWildcard: boolean;
  requiresReview: boolean;
  sourceRows: number[];
};

export type RequirementGroup = {
  id: string;
  label: string;
  requirementType: RequirementType;
  minCourses?: number;
  minCredits?: number;
  options: RequirementOption[];
  sourceRows: number[];
  reviewStatus: "ok" | "needs_review";
  notes?: string;
};

export type CatalogReviewIssue = {
  programId: string;
  sourceSheet: string;
  sourceRow: number;
  rawValues: Record<string, unknown>;
  reason: string;
  suggestedRequirementType?: RequirementType;
};

export type ProgramCatalog = {
  programId: string;
  programName: string;
  credentialType: "Certificate" | "Technical Certificate" | "AAS" | "AS" | "Other";
  totalCredits: number;
  requirementGroups: RequirementGroup[];
  source: {
    workbookName: string;
    importedAt: string;
    sourceSheetNames: string[];
  };
  rowsNeedingReview: CatalogReviewIssue[];
};

export type CourseOffering = {
  courseId: string;
  term: TermName;
  modalities: Modality[];
  location: Location;
  capacityLevel: "Low" | "Medium" | "High";
};

export type StudentProfile = {
  id: string;
  name: string;
  programId: string;
  completedCourses: string[];
  failedCourses?: string[];
  withdrawnCourses?: string[];
  maxCreditsPerTerm: number;
  preferredModalities: Modality[];
  availableTerms: TermName[];
  workLifeConstraint: "Low" | "Medium" | "High";
  academicRisk: "Low" | "Medium" | "High";
};

export type AcademicState = {
  programId: string;
  completedCourses: string[];
  failedCourses: string[];
  withdrawnCourses: string[];
  currentTerm: TermName;
  creditsEarned: number;
  termsElapsed: number;
  studentProfileId: string;
};

export type ScheduleAction = {
  term: TermName;
  courses: string[];
  totalCredits: number;
  rationale: string;
};

export type SimulationOutcome = {
  completed: boolean;
  stoppedOut: boolean;
  termsToCompletion: number | null;
  creditsEarned: number;
  bottleneckCoursesHit: string[];
  pathway: ScheduleAction[];
};

export type BottleneckInsight = {
  courseId?: string;
  courseCode?: string;
  requirementGroupId?: string;
  label: string;
  frequency: number;
  reason: string;
};

export type SimulationSummary = {
  programId: string;
  studentProfileId: string;
  simulationRuns: number;
  completionProbability: number;
  stopoutProbability: number;
  averageTermsToCompletion: number | null;
  averageCreditsEarned: number;
  topSuccessfulPathways: {
    pathwayLabel: string;
    frequency: number;
    averageTerms: number;
  }[];
  topStopoutPoints: {
    courseId?: string;
    courseCode?: string;
    requirementGroupId?: string;
    reason: string;
    frequency: number;
  }[];
  bottlenecks: BottleneckInsight[];
  recommendedSchedules: {
    schedule: ScheduleAction;
    estimatedCompletionProbability: number;
    riskLevel: "Low" | "Medium" | "High";
    rationale: string;
  }[];
};
