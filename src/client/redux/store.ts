import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import testReducer from "./testss/test.reducer";
import userReducer from "./user/user.reducers";
import thunk from "redux-thunk";

const state = {};

const middlewares = [thunk];

const reducers = combineReducers({ posts: testReducer, user: userReducer });

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

let store = createStore(
  reducers,
  state,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
      : (f) => f
  )
);

store.subscribe(() => console.log("store changed", store.getState()));

export default store;
