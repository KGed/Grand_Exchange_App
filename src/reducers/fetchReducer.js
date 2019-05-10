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
      console.log('Made it to fetch begin')
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_API_SUCCESS:
      console.log('Made it to fetch success')
      return {
        searchResults: action.payload,
        loading: true,
        error: null
      }

    case FETCH_API_FAILURE:
      console.log('Made it to fetch failure')
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
