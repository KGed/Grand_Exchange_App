export const FETCH_API_BEGIN = 'FETCH_API_BEGIN'
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS'
export const FETCH_API_FAILURE = 'FETCH_API_FAILURE'

export const fetchApiBegin = () => {
  return {
    type: 'FETCH_API_BEGIN'
  }
}

export const fetchApiSuccess = data => {
  return {
    type: 'FETCH_API_SUCCESS',
    payload: data
  }
}

export const fetchApiFailure = err => {
  return {
    type: 'FETCH_API_FAILURE',
    payload: err
  }
}
