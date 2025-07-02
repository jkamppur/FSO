const User = require('../models/user')
const jwt = require('jsonwebtoken')

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

  if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  // console.log(error.name)
  // console.log(error.message)

  next(error)
}


// Muista, että normaali middleware on funktio, jolla on kolme parametria,
// ja joka kutsuu lopuksi parametrina next olevaa funktiota:
const tokenExtractor = (request, response, next) => {
  // tokenin ekstraktoiva koodi
  const authorization = request.get('authorization')
  // Hyväksytään vain Bearer-skeema
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  next()
}

const userExtractor = async (request, response, next) => {

  // tokenin ekstraktoiva koodi
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  request.user = user

  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}