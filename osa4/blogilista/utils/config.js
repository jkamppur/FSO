require('dotenv').config()  // read variables from .env

const PORT = process.env.PORT

// Different DB URI for test mode
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}