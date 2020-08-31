import {
  LOGIN,
  GET_USER_DATA,
  SET_AUTHORIZATION_MANUALLY,
  TOGGLE_LOADING,
  LOGOUT,
} from "./user.types";

import { UserStateInReduxStore } from "../../../shared/types/user.types";

const userState: UserStateInReduxStore = {
  user: null,
  isAuthorised: false,
  interviews: [],
  err: null,
  token: null,
  isLoading: false,
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isAuthorised: action.payload.isAuthorised,
        interviews: action.payload.interviews,
        err: action.payload.err,
        token: action.payload.token,
      };

    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload.user,
        interviews: action.payload.interviews,
        err: action.payload.err,
        isAuthorised: action.payload.isAuthorised,
        isLoading: action.payload.isLoading,
      };

    case LOGOUT:
      return {
        ...state,
        user: action.payload.user,
        interviews: action.payload.interviews,
        err: action.payload.err,
        isAuthorised: action.payload.isAuthorised,
        isLoading: action.payload.isLoading,
        token: action.payload.token,
      };

    case SET_AUTHORIZATION_MANUALLY:
      return {
        ...state,
        isAuthorised: action.payload.isAuthorised,
      };

    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    default:
      return state;
  }
};

export default userReducer;
