const url = "/api";

export function addPost(data, cb) {
  return (dispatch) => {
    fetch(`${url}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin", // send cookies
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          cb(true);
        }
      });
  };
}

export function getPost(data) {
  return (dispatch) => {
    fetch(`${url}/posts`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "GET_POST",
          data,
        });
      });
  };
}

export function getSinglePost(id, cb) {
  return (dispatch) => {
    fetch(`${url}/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          dispatch({
            type: "GET_SINGLE_POST",
            data,
          });
          cb(true);
        } else {
          cb(false);
        }
      });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    fetch(`${url}/post/${id}/delete`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "GET_POST",
          data,
        });
      });
  };
}

export function updatePost(data, id, cb) {
  return (dispatch) => {
    fetch(`${url}/post/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data, id),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          dispatch({
            type: "POST_UPDATE_SUCCESS",
            message: data.message
          });
          cb(true);
        } else {
          dispatch({
            type: "POST_UPDATE_FAIL",
            error: data.error
          });
          cb(false);
        }
      });
  };
}

export function logout(cb) {
  return (dispatch) => {
    fetch(`http://localhost:8000/logout`).then((data) => {
      dispatch({
        type: "LOGOUT_USER",
      });
      cb(true);
    });
  };
}
