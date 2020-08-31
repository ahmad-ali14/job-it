import { LOGIN } from "./user.types";
import { LoginResponse } from "../../../shared/types/user.types";

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
