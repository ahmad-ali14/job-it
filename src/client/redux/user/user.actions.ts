import {
  LOGIN,
  GET_USER_DATA,
  SET_AUTHORIZATION_MANUALLY,
  TOGGLE_LOADING,
} from "./user.types";

import {
  LoginResponse,
  GetUserDataResponse,
} from "../../../shared/types/user.types";

export const userLogin = (email, password) => (dispatch) => {
  fetch("/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((responseObject: LoginResponse) => {
      console.log(responseObject.user);
      if (responseObject.user !== null) {
        window.localStorage.setItem(
          "userId",
          responseObject.user._id.toString()
        );
        window.localStorage.setItem("token", responseObject.token);
      }

      return dispatch({
        type: LOGIN,
        payload: responseObject,
      });
    });
};

export const getUserData = (token: string, userId: string) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADING });
  fetch(`/api/user/single/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((responseObject: GetUserDataResponse) => {
      return dispatch({
        type: GET_USER_DATA,
        payload: { ...responseObject, isLoading: false },
      });
    });
};

export const setIsAuthorised = (value: boolean) => (dispatch) => {
  return dispatch({
    type: SET_AUTHORIZATION_MANUALLY,
    payload: {
      isAuthorised: value,
    },
  });
};
