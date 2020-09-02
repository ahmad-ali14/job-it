import {
  LOGIN,
  GET_USER_DATA,
  SET_AUTHORIZATION_MANUALLY,
  // TOGGLE_LOADING,
  LOGOUT,
  ADD_INTERVIEW,
  DELETE_INTERVIEW,
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

import { SET_LOADING } from "../app/app.types";

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
  dispatch({ type: SET_LOADING, payload: { loading: true } });
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
        payload: { ...responseObject },
      });
    })
    .then(() => {
      dispatch({ type: SET_LOADING, payload: { loading: false } });
    });
};

export const logUserOut = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: { loading: true } });
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userId");

  await dispatch({
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
  return dispatch({ type: SET_LOADING, payload: { loading: false } });
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
  dispatch({ type: SET_LOADING, payload: { loading: true } });
  const addInterviewBody = { userId, ...data, _id: mongoose.Types.ObjectId() };

  fetch("/api/interview/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(addInterviewBody),
  })
    .then((res) => res.json())
    .then((responseObject) => {
      return dispatch({
        type: ADD_INTERVIEW,
        payload: {
          ...responseObject,
          isLoading: false,
          interview: addInterviewBody,
        },
      });
    })
    .then(() => {
      dispatch({ type: SET_LOADING, payload: { loading: false } });
    });
};

export const deleteInterviewFromUser = (interviewId, userId, token) => (
  dispatch
) => {
  dispatch({ type: SET_LOADING, payload: { loading: true } });
  fetch("/api/interview/delete", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ userId, interviewId }),
  })
    .then((res) => res.json())
    .then((responseObject) => {
      console.log("res.objcect", responseObject);
      return dispatch({
        type: DELETE_INTERVIEW,
        payload: { interviews: responseObject, isLoading: false },
      });
    })
    .then(() => {
      dispatch({ type: SET_LOADING, payload: { loading: false } });
    });
};
