const blogsRouter = require('express').Router()
const logger = require('../utils/logger.js')
const Blog = require('../models/blog.js')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
  logger.info(request.body)
  const blog = new Blog(request.body)

  const keys = Object.keys(request.body)

  if (!keys.includes('likes')) {
    blog.likes = 0
  }

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
