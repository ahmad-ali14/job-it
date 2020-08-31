import { LOGIN } from "./user.types";
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

    default:
      return state;
  }
};

export default userReducer;
