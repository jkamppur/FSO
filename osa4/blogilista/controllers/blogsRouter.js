const blogsRouter = require('express').Router()
const logger = require('../utils/logger.js')
const Blog = require('../models/blog.js')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('', async (request, response, next) => {
  logger.info(request.body)
  const blog = new Blog(request.body)

  const keys = Object.keys(request.body)

  try {
    if (!keys.includes('likes')) {
      blog.likes = 0
    }

    if (!keys.includes('title') || !keys.includes('author')) {
      response.status(400).end()
    }

    const result = await blog.save()
    response.status(201).json(result)

  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter
