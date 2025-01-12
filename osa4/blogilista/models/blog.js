const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// const Blog = mongoose.model('Blog', blogSchema)

//  const mongoUrl = 'mongodb://localhost/bloglist'
const url = process.env.MONGODB_URI

mongoose.connect(url)

module.exports = mongoose.model('Blog', blogSchema)
