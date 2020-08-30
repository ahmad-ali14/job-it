import { LOGIN } from "./user.types";

const userState = {
  user: {},
  isAuthorised: false,
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isAuthorised: action.payload.isAuthorised,
      };

    default:
      return state;
  }
};

export default userReducer;
