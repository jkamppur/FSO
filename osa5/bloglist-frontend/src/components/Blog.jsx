import { useState } from 'react'
import propTypes from 'prop-types'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import { CardContent, CardHeader, Typography, Button } from '@mui/material'


const Blog = ({ blogs , userInfo, addLike, removeBlog,  }) => {
  const cardStyle={
    marginTop: 5,
    maxWidth: 400,
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
    <Card sx={cardStyle}>
      <CardHeader title={blog.title}/>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          by {blog.author}
        </Typography>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          <a href={'http://'+blog.url}>{blog.url}</a>
        </Typography>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 12 }}>
          added by {blog.userId[0].name}
        </Typography>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 12 }}>
          {blog.likes} likes
          {userInfo?.name && <Button variant="outlined" color="success" size="small" sx={{ ml: 2 }} onClick={increaseLike}>like</Button>}
          {blog.userId[0].name === userInfo?.name && <Button variant="outlined" color="error" size="small" sx={{ ml: 1 }} onClick={handleRemoveBlog}>Remove</Button>}
        </Typography>
      </CardContent>
    </Card>
  )

}

export default Blog