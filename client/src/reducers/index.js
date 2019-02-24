const initState = {
  posts: [],
  singlePost: {}
}

export default function Reducer(state = initState, action) {
  switch (action.type) {
    case 'GET_POST': {
      return {
        ...state,
        posts: action.data
      }
    }

    case 'GET_SINGLE_POST': {
      return {
        ...state,
        singlePost: action.data
      }
    }
      
    default:
      return state;
  }
}