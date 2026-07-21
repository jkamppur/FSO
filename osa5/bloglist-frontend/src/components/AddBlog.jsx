import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

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
          <TextField
            fullWidth
            id="titleInput"
            value={title}
            label="title"
            margin="dense"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            id="authorInput"
            value={author}
            label="author"
            margin="dense"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            id="urlInput"
            value={url}
            label="url"
            margin="dense"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          create
        </Button>
      </form>
    </div>

  )

}


export default AddNewBlog