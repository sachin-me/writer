const initState = {
  posts: [],
  singlePost: {},
  user: {}
}

export default function Reducer(state = initState, action) {
  switch (action.type) {
    case 'GET_POST': {
      return {
        ...state,
        posts: action.data.posts,
        user: { id: action.data.userId, name: action.data.username }
      }
    }

    case 'GET_SINGLE_POST': {
      return {
        ...state,
        singlePost: action.data.post
      }
    }

    case 'LOGOUT_USER': {
      return {
        ...state
      }
    }
      
    default:
      return state;
  }
}