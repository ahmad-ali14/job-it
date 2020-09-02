import {
  SET_CURRENET_INTERVIEW_FUNCTIONALITY,
  SET_CURRENET_INTERVIEW_SECTION,
} from "./app.types";

import {
  CurrentInterviewSectionType,
  CurrentInterviewFunctionalityType,
} from "../../../shared/types/app.types";

export const changeCurrenetInterviewSection = (
  currentSection: CurrentInterviewSectionType
) => (dispatch) => {
  dispatch({
    type: SET_CURRENET_INTERVIEW_SECTION,
    payload: {
      currentInterviewSection: currentSection,
    },
  });
};

export const changeCurrenetInterviewFunctionality = (
  currentFunction: CurrentInterviewFunctionalityType
) => (dispatch) => {
  dispatch({
    type: SET_CURRENET_INTERVIEW_FUNCTIONALITY,
    payload: {
      currentInterviewFunctionality: currentFunction,
    },
  });
};
