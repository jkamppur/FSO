const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogsRouter')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)  // Määrittelee polun jossa router kuuntelee
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)

module.exports = app