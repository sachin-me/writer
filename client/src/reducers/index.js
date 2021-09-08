const initState = {
  posts: [],
  singlePost: {},
  user: {},
  message: "",
  error: "",
};

export default function Reducer(state = initState, action) {
  switch (action.type) {
    case "CREATE_USER_SUCCESS": {
      return {
        ...state,
        message: action.message,
      };
    }

    case "CREATE_USER_FAIL": {
      return {
        ...state,
        error: action.error,
      };
    }

    case "LOGIN_SUCCESS": {
      return {
        ...state,
        message: action.message,
      };
    }

    case "LOGIN_FAIL": {
      return {
        ...state,
        error: action.error,
      };
    }

    case "LOGGED_IN_USER_SUCCESS": {
      return {
        ...state,
        message: action.message,
        user: action.user,
      };
    }

    case "LOGGED_IN_USER_FAIL": {
      return {
        ...state,
        error: action.error,
      };
    }

    case "GET_POST": {
      return {
        ...state,
        posts: action.data.posts,
      };
    }

    case "GET_SINGLE_POST": {
      return {
        ...state,
        singlePost: action.data.post,
      };
    }

    case "POST_DELETE_FAIL": {
      return {
        ...state,
        error: action.error,
      };
    }

    case "POST_UPDATE_FAIL": {
      return {
        ...state,
        error: action.error,
      };
    }

    case "POST_DELETE_SUCCESS": {
      return {
        ...state,

      }
    }

    case "LOGOUT_USER": {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}
