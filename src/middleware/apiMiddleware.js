const apiMiddleware = store => next => action => {
  // check action

  next(action)
}
