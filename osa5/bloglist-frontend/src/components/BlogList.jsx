import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  function compareLikes(a, b) {
    return b.likes - a.likes
  }

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.sort(compareLikes).map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title+' by '+blog.author}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default BlogList