const blogsRouter = require('express').Router()
const logger = require('../utils/logger.js')
const Blog = require('../models/blog.js')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('userId', { username: 1, name: 1 })

  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  // Hyväksytään vain Bearer-skeema
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// Blogin lisäys
blogsRouter.post('', async (request, response, next) => {
  logger.info(request.body)
  const keys = Object.keys(request.body)
  var likes = 0

  // Tarkastetaan token, saadaan myös käyyäjän id samalla.
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

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
