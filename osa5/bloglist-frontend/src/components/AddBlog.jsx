import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AddNewBlog = ({ addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const navigate = useNavigate()

  const addBlog2 = async (event) => {
    event.preventDefault()
    addBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
    navigate('/')
  }

  return (

    <div>

      <h2>create new</h2>

      <form onSubmit={addBlog2}>
        <div>
              title:
          <input
            type="text"
            id="titleInput"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
              author:
          <input
            type="text"
            id="authorInput"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
              url:
          <input
            type="text"
            id="urlInput"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>

  )

}


export default AddNewBlog