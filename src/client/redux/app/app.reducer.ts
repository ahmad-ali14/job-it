import {
  SET_CURRENET_INTERVIEW_SECTION,
  SET_CURRENET_INTERVIEW_FUNCTIONALITY,
  SET_LOADING,
} from "./app.types";

import { AppStateTypes } from "../../../shared/types/app.types";

const userState: AppStateTypes = {
  currentInterviewSection: "this week",
  currentInterviewFunctionality: "show interviews",
  err: null,
  loading: false,
};

const appReducer = (state = userState, action) => {
  switch (action.type) {
    case SET_CURRENET_INTERVIEW_SECTION:
      return {
        ...state,
        currentInterviewSection: action.payload.currentInterviewSection,
      };

    case SET_CURRENET_INTERVIEW_FUNCTIONALITY:
      return {
        ...state,
        currentInterviewFunctionality:
          action.payload.currentInterviewFunctionality,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    default:
      return state;
  }
};

export default appReducer;
