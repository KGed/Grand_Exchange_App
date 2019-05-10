import {
  FETCH_API_BEGIN,
  FETCH_API_SUCCESS,
  FETCH_API_FAILURE
} from '../actions/fetchActions'

const initialState = {
  items: [],
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
        ...state,
        loading: false,
        data: action.payload
      }

    case FETCH_API_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: []
      }

    default:
      return state
  }
}

export default fetchReducer
