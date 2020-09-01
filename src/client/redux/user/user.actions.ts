import {
  LOGIN,
  GET_USER_DATA,
  SET_AUTHORIZATION_MANUALLY,
  TOGGLE_LOADING,
  LOGOUT,
  ADD_INTERVIEW,
} from "./user.types";

import {
  LoginResponse,
  GetUserDataResponse,
} from "../../../shared/types/user.types";

import {
  Interview,
  InterviewWithoutId,
} from "../../../shared/types/interview.types";

import * as mongoose from "mongoose";

/*************
 *  Authorization
 *************/

export const userLogin = (email, password) => (dispatch) => {
  fetch("/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((responseObject: LoginResponse) => {
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

export const logUserOut = () => (dispatch) => {
  dispatch({ type: TOGGLE_LOADING });
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userId");

  dispatch({
    type: LOGOUT,
    payload: {
      user: null,
      isAuthorised: false,
      interviews: [],
      err: null,
      token: null,
      isLoading: false,
    },
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

/*************
 *  Interviews
 *************/

export const addInterviewToUser = (data: InterviewWithoutId, token, userId) => (
  dispatch
) => {
  dispatch({ type: TOGGLE_LOADING });
  const addInterviewBody = { userId, ...data, _id: mongoose.Types.ObjectId() };
  console.log(addInterviewBody);

  fetch("/api/interview/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(addInterviewBody),
  })
    .then((res) => res.json())
    .then((resData) => {
      console.log("res.data", resData);
      return dispatch({
        type: ADD_INTERVIEW,
        payload: { ...resData, isLoading: false, interview: addInterviewBody },
      });
    });
};
