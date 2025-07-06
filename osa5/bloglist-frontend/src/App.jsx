import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // Add blog
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  // notification
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    // Local storage tyhjennys  window.localStorage.removeItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      // Kirjautuneen käyttäjän tiedot tallentuvat nyt local storageen
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      setSuccessMessage('user succesfully logged in')
      setTimeout(() => {
         setSuccessMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
         setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setSuccessMessage('user succesfully logged out')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const handleAddNewBlog = async (event) => {
    event.preventDefault()

    blogService
      .create({ title: title,
                author: author,
                url: url })
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        console.log(returnedBlog)
        setSuccessMessage(`${returnedBlog.title} by ${returnedBlog.author} added`)
        setTitle('')
        setAuthor('')
        setUrl('')

        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }).catch(error => {      // Handling of failure for person create
        setErrorMessage(
        `Blog add failed: ${error}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }


  if (user === null ) {

    return (
      <div>
        <h2>Login</h2>
        <ErrorNotification message={errorMessage}/>
        <SuccessNotification message={successMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              // Muutoksenkäsittelijä on yksinkertainen, se destrukturoi
              // parametrina tulevasta oliosta kentän target ja asettaa sen
              // arvon vastaavaan tilaan
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs
      </h2>
      <ErrorNotification message={errorMessage}/>
      <SuccessNotification message={successMessage}/>
      <p>{user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

      <h2>create new</h2>
        <form onSubmit={handleAddNewBlog}>
          <div>
            title:
              <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
              <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
              <input
              type="text"
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

export default App