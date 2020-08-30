import { FETCH_POSTS, NEW_POST } from "./test.types";

const initialState = {
  items: [],
  item: {},
};

const testReducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload,
      };
    case NEW_POST:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
};

export default testReducer;
