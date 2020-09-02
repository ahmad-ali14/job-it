export interface AppStateTypes {
  currentInterviewSection: CurrentInterviewSectionType;
  currentInterviewFunctionality: CurrentInterviewFunctionalityType;
  loading: boolean;
  err: string | null;
}

export type CurrentInterviewSectionType =
  | "this week"
  | "previous interviews"
  | "future interviews";

export type CurrentInterviewFunctionalityType =
  | "show interviews"
  | "add interview";
