const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const testBlogs = [
  {
    'title': 'test blog 2',
    'author': 'T. Testaaja',
    'url': 'www.hs.fi',
    'likes': 3,
    'id': '6783cd39dcaa076626bb0c9a'
  },
  {
    'author': 'T. Testaaja',
    'title': 'test blog',
    'url': 'www.hs.fi',
    'likes': 77,
    'id': '6783c532dc2b2b250e22db6'
  },
  {
    'title': 'Avustajan tunnustukset',
    'author': 'A. Avustaja',
    'url': 'www.hs.fi',
    'likes': 124,
    'id': '6783cd39dcaa076626bb0c9a'
  },
]

// Teht 4.3
describe ('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

// Teht 4.4
describe ('totalLikes', () => {
  test('totalLikes sums correctly empty list', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('totalLikes sum correctly three blogs', () => {
    const result = listHelper.totalLikes(testBlogs)
    assert.strictEqual(result, 204)
  })
})

// Teht 4.5
describe ('favoriteBlog', () => {
  test('favoriteBlog return empty for empty list', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, {})
  })

  test('favoriteBlog return correct blog from three blogs list', () => {
    const result = listHelper.favoriteBlog(testBlogs)
    assert.deepStrictEqual(result, testBlogs[2])
  })
})

// Teht 4.6*
describe ('mostBlogs', () => {
  test('mostBlogs return empty for empty list', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, {})
  })

  test('mostBlogs returns correct info from three blogs', () => {
    const result = listHelper.mostBlogs(testBlogs)
    const expected = {
      'author': 'T. Testaaja',
      'blogs': 2
    }
    assert.deepStrictEqual(result, expected)
  })
})

// Teht 4.7*
describe ('mostLikes', () => {
  test('mostLikes return empty for empty list', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, {})
  })

  test('mostLikes returns correct info from three blogs', () => {
    const result = listHelper.mostLikes(testBlogs)
    const expected = {
      'author': 'A. Avustaja',
      'likes': 124
    }
    assert.deepStrictEqual(result, expected)
  })
})