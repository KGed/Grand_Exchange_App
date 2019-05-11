import {
  FETCH_API_BEGIN,
  FETCH_API_SUCCESS,
  FETCH_API_FAILURE
} from '../actions/fetchActions'

const initialState = {
  searchResults: [],
  loading: false,
  error: null
}

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_API_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_API_SUCCESS:
      return {
        searchResults: action.payload,
        loading: false,
        error: null
      }

    case FETCH_API_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}

export default fetchReducer
