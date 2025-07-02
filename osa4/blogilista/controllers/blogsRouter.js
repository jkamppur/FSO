const blogsRouter = require('express').Router()
const logger = require('../utils/logger.js')
const Blog = require('../models/blog.js')
const middleware = require('../utils/middleware')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('userId', { username: 1, name: 1 })

  response.json(blogs)
})

// Blogin lisäys
blogsRouter.post('', middleware.userExtractor, async (request, response, next) => {
  logger.info(request.body)
  const keys = Object.keys(request.body)
  var likes = 0

  const user = request.user

  try {
    if (keys.includes('likes')) {
      likes = request.body.likes
    }

    if (!keys.includes('title') || !keys.includes('author') ) { //|| !keys.includes('userid') ) {
      response.status(400).end()
    } else {

      const newBlog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: likes,
        userId: user._id
      })

      const result = await newBlog.save()

      user.blogs = user.blogs.concat(newBlog._id)  // Tallennetaan myös käyttäjän tietoihin lisätty blog
      await user.save()

      response.status(201).json(result)
    }


  } catch(exception) {
    next(exception)
  }
})

// 4.13* blogin poisto
// Middleware otettu käyttöön käsittelijälle
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {

  const blog = await Blog.findById(request.params.id)

  if (blog === null) {
    return response.status(400).json({ error: 'blog not found' })
  }

  if ( blog.userId.toString() !== request.user.id ) {
    return response.status(401).json({ error: 'only blog author can delete it' })
  }

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
