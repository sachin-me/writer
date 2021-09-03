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
};

export default userAction;
