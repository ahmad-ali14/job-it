import { LOGIN } from "./user.types";

export const userLogin = (email, password) => (dispatch) => {
  fetch("/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((user) =>
      dispatch({
        type: LOGIN,
        payload: {
          user: user,
          isAuthorised: true,
        },
      })
    );
};
