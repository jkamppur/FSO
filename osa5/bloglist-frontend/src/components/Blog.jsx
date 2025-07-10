import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
    console.log(blog)
  }

  const addLike = () => {
    console.log('Add like not yet implemented')
  }


  if (showDetails === false) {
    return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={toggleDetails}>view</button>
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
      likes {blog.likes} <button onClick={addLike}>like</button>
      </div>
      <div>
      {blog.author}
      </div>
     </div>
  )
}

export default Blog