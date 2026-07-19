import { useState } from 'react'
import propTypes from 'prop-types'
import { useParams, useNavigate } from 'react-router-dom'


const Blog = ({ blogs , userInfo, addLike, removeBlog,  }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    // border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const navigate = useNavigate()

  const id = useParams().id
  const blog=blogs.find(n => n.id === id)


  Blog.propTypes = {
    blogs: propTypes.array.isRequired,
    addLike: propTypes.func.isRequired,
    removeBlog: propTypes.func.isRequired,
    userInfo: propTypes.object.isRequired
  }

  const increaseLike = () => {
    console.log('add like next')
    addLike(blog.title, blog.author, blog.url, blog.likes + 1, blog.id)
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
      navigate('/')
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div style={blogStyle}>
      <h3>
        {blog.author+': '+blog.title}
      </h3>
      <a href={'http://'+blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes} {userInfo?.name && <button onClick={increaseLike}>like</button>}
      </div>
      <div>
        added by {blog.userId[0].name}
      </div>
      <div>
        {blog.userId[0].name === userInfo?.name && <button onClick={handleRemoveBlog}>Remove</button>}
      </div>
    </div>
  )

}

export default Blog