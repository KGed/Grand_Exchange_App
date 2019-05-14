const logger = store => next => action => {
  console.log('action:', action.type)
  console.log('store state: ', store.getState())
  next(action)
}

export default logger
