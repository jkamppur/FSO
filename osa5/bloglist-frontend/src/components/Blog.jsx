import { useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, userInfo }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  Blog.propTypes = {
    blog: propTypes.object.isRequired,
    addLike: propTypes.func.isRequired,
    removeBlog: propTypes.func.isRequired,
    userInfo: propTypes.object.isRequired
  }

  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const increaseLike = () => {
    addLike(blog.title, blog.author, blog.url, blog.likes + 1, blog.id)
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  if (showDetails === false) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}<button onClick={toggleDetails}>view</button>
        </div>
      </div>
    )
  }

  if (blog.userId[0].name === userInfo.name) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} <button onClick={toggleDetails}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={increaseLike}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          <button onClick={handleRemoveBlog}>Remove</button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={toggleDetails}>hide</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes} <button onClick={increaseLike}>like</button>
      </div>
      <div>
        {blog.author}
      </div>
    </div>
  )
}

export default Blog