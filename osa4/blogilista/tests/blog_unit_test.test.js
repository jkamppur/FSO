const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const testBlogs = [
  {
    'author': 'T. Testaaja',
    'title': 'test blog',
    'url': 'www.hs.fi',
    'likes': 5,
    'id': '6783c532dc2b2b250e22db6'
  },
  {
    'title': 'test blog 2',
    'author': 'T. Testaaja',
    'url': 'www.hs.fi',
    'likes': 7,
    'id': '6783cd39dcaa076626bb0c9a'
  },
  {
    'title': 'test blog 3',
    'author': 'T. Testaaja',
    'url': 'www.hs.fi',
    'likes': 3,
    'id': '6783cd39dcaa076626bb0c9a'
  },
]


describe ('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe ('totalLikes', () => {
  test('totalLikes sums correctly empty list', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('totalLikes sum correctly three blogs', () => {
    const result = listHelper.totalLikes(testBlogs)
    assert.strictEqual(result, 15)
  })
})

describe ('favoriteBlog', () => {
  test('favoriteBlog return empty for empty list', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, {})
  })

  test('favoriteBlog return correct blog from three blogs list', () => {
    const result = listHelper.favoriteBlog(testBlogs)
    assert.strictEqual(result, testBlogs[1])
  })
})