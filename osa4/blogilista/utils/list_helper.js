var _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return   blogs.reduce((a, b) => a + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return {}

  let len = blogs.length
  let maxLikes = 0
  let favoriteBlog = {}
  while (len--) {
    if (blogs[len].likes > maxLikes) {
      maxLikes = blogs[len].likes
      favoriteBlog = blogs[len]
    }
  }
  return favoriteBlog
}

// Teht 4.6
// Määrittele funktio mostBlogs, joka saa parametrikseen taulukollisen blogeja.
// Funktio selvittää kirjoittajan, jolla on eniten blogeja. Funktion paluuarvo
// kertoo myös ennätysbloggaajan blogien määrän:

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return {}

  var temp_result = _.groupBy(blogs, 'author')
  temp_result = _.orderBy(temp_result, 'length')

  var index = temp_result.length - 1

  var author= temp_result[index][0].author
  var no_of_blogs = temp_result[index].length

  const result = { 'author': author, 'blogs': no_of_blogs }

  return result
}


// Teht 4.7
// Määrittele funktio mostLikes, joka saa parametrikseen taulukollisen blogeja.
// Funktio selvittää kirjoittajan, jonka blogeilla on eniten tykkäyksiä.
// Funktion paluuarvo kertoo myös suosikkibloggaajan likejen yhteenlasketun määrän:
const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return {}

  var temp_result = _.groupBy(blogs, 'author')
  temp_result = _.orderBy(temp_result, 'length')

  var len = temp_result.length
  var max_likes = 0
  var favorite_author = ''
  while (len--) {
    var likes = 0
    var len_2 = temp_result[len].length
    while (len_2--) {
      likes += temp_result[len][len_2].likes
    }
    if (likes > max_likes) {
      max_likes = likes
      favorite_author = temp_result[len][0].author
    }
  }
  const result = { 'author': favorite_author, 'likes': max_likes }

  return result
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}