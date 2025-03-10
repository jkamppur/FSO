// Error handler middelware:
const errorHandler = (error, request, response, next) => {
  if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }

  if (error.name === 'ValidationError' && error.message.includes('username') && error.message.includes('shorter than the minimum allowed length')) {
    return response.status(400).json({ error: 'username too short' })
  }

  if (error.name === 'ValidationError' && error.message.includes('Path `username` is required')) {
    return response.status(400).json({ error: 'username required' })
  }

  // console.log(error.name)
  // console.log(error.message)

  next(error)
}

module.exports = {
  errorHandler
}