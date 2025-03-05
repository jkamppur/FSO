const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')

// Testi importtaa tiedostoon app.js määritellyn Express-sovelluksen
// ja käärii sen funktion supertest avulla ns. superagent-olioksi.
const api = supertest(app)

const initialBLogs = [
  {
    'author': 'T. Testaaja',
    'title': 'test blog',
    'url': 'www.hs.fi',
    'likes': 77,
  },
  {
    'title': 'Avustajan tunnustukset',
    'author': 'A. Avustaja',
    'url': 'www.hs.fi',
    'likes': 124,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBLogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBLogs[1])
  await blogObject.save()
})

describe ('blog read using api', () => {
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBLogs.length)
  })

  test('the first blog is test blog', async () => {
    const response = await api.get('/api/blogs')
    // async, await: tänne tullaan vasta kun edellinen komento eli HTTP-pyyntö on suoritettu
    // muuttujassa response on nyt HTTP-pyynnön tulos

    const contents = response.body.map(e => e.title)
    assert(contents.includes('test blog'))
  })

  // teht 4.8
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // teht 4.9
  test('blogs contains key id', async () => {

    const response = await api.get('/api/blogs')
    const ids = response.body.map(blog => blog.id)

    ids.forEach(element => {
      assert.notEqual(element, undefined)
    })
  })
})

describe ('blog add using api', () => {

  // teht 4.10
  test('blog can be added', async () => {

    const newBlog = {
      'title': 'Avustajan salaiset tunnustukset',
      'author': 'A. Avustaja',
      'url': 'www.seiska.fi',
      'likes': 987,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Check that length of blogs has increased by 1
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBLogs.length + 1)

    // Check that last blog in returned list matches with added blog
    const addedBlog = response.body[response.body.length-1]
    delete addedBlog.id
    assert.deepEqual(newBlog, addedBlog)
  })

  // teht 4.11*
  test('blog with likes can be added, likes is set to zero', async () => {

    const newBlog = {
      'title': 'Avustajan tylsät tunnustukset',
      'author': 'A. Avustaja',
      'url': 'www.seiska.fi',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Check that last blog likes = 0
    const response = await api.get('/api/blogs')
    const addedBlog = response.body[response.body.length-1]
    assert.equal(addedBlog.likes, 0)
  })

  // teht 4.12*
  test('blog without title is not stored', async () => {
    const newBlog = {
      'author': 'No. Title',
      'url': 'www.youtube.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('blog without author is not stored', async () => {
    const newBlog = {
      'title': 'No. author',
      'url': 'www.youtube.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})



// Kaikkien testien päätteeksi on vielä lopputoimenpiteenä katkaistava
// Mongoosen käyttämä tietokantayhteys.
after(async () => {
  await mongoose.disconnect()
})

