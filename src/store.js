import { createStore, applyMiddleware } from 'redux'

import reducers from './reducers'

import logger from './middleware/logger'

const createStoreWithMiddleware = applyMiddleware(logger)(createStore)

export default createStoreWithMiddleware(reducers)
