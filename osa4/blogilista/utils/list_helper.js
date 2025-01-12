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

module.exports = {
  dummy, totalLikes, favoriteBlog
}