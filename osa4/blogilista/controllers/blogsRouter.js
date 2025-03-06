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

// 4.13* blogin poisto
blogsRouter.delete('/:id', async (request, response, next) => {

  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

  } catch(exception) {
    next(exception)
  }
})

// 4.14* blogin muokkaus
blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body

    const keys = Object.keys(body)
    if (!keys.includes('title') || !keys.includes('author') || !keys.includes('likes') || !keys.includes('url')) {
      response.status(400).end()
    }

    const blog = {
      'title': body.title,
      'author': body.author,
      'url': body.url,
      'likes': body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    response.json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter
