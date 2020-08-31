import { LOGIN, GET_USER_DATA, SET_AUTHORIZATION_MANUALLY } from "./user.types";
import { LoginResponse } from "../../../shared/types/user.types";

const userState: LoginResponse = {
  user: null,
  isAuthorised: false,
  interviews: [],
  err: null,
  token: null,
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
      };

    case SET_AUTHORIZATION_MANUALLY:
      return {
        ...state,
        isAuthorised: action.payload.isAuthorised,
      };

    default:
      return state;
  }
};

export default userReducer;
