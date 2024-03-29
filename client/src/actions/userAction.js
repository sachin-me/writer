const uri = "/api";
const userAction = {
  create: (data, cb) => (dispatch) => {
    fetch(`${uri}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.message) {
          dispatch({
            type: "CREATE_USER_SUCCESS",
            message: user.message,
          });
          cb(true);
        } else {
          dispatch({
            type: "CREATE_USER_FAIL",
            error: user.error,
          });
          cb(false, user.error);
        }
      });
  },
  loginUser: (data, cb) => (dispatch) => {
    fetch(`${uri}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.message) {
          dispatch({
            type: "LOGIN_SUCCESS",
            message: user.message,
          });
          cb(true);
        } else {
          dispatch({
            type: "LOGIN_FAIL",
            error: user.error,
          });
          cb(false, user.error);
        }
      });
  },
  loggedInUser: (cb) => (dispatch) => {
    fetch(`${uri}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin", // send cookies
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.message) {
          dispatch({
            type: "LOGGED_IN_USER_SUCCESS",
            user: user.user,
          });
          cb(true);
        } else {
          dispatch({
            type: "LOGGED_IN_USER_FAIL",
            error: user.error,
          });
          cb(false);
        }
      });
  },
  logout: (cb) => {
    return (dispatch) => {
      fetch(`${uri}/logout`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            dispatch({
              type: "LOGOUT_USER_SUCCESS",
              message: data.message,
            });
            cb(true);
          }
        });
    };
  },
};

export default userAction;
