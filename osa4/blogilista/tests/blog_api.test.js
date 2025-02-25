const { test, after, beforeEach } = require('node:test')
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

  // Check that length of blogs has increased by 1
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBLogs.length + 1)

  // Check that last blog in returned list matches with added blog
  const addedBlog = response.body[response.body.length-1]
  delete addedBlog.id
  assert.deepEqual(newBlog, addedBlog)
})

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

// Kaikkien testien päätteeksi on vielä lopputoimenpiteenä katkaistava
// Mongoosen käyttämä tietokantayhteys.
after(async () => {
  await mongoose.disconnect()
})

