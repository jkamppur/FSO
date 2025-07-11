import { useState } from 'react'

const AddNewBlog = ({
  handleAddNewBlog, // <-- destruktointi
}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    handleAddNewBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (

    <div>

      <h2>create new</h2>

      <form onSubmit={addBlog}>
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