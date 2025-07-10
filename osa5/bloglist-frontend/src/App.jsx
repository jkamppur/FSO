import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import AddNewBlog from './components/AddBlog'
import Togglable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // notification
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  // ref for togglable
  const blogFormRef = useRef()


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

  const handleAddNewBlog = (title, author, url) => {
    // Voimme nyt piilottaa lomakkeen kutsumalla blogFormRef.current.toggleVisibility()
    // samalla kun uuden blogin luominen tapahtuu:
    blogFormRef.current.toggleVisibility()
    blogService
      .create({ title: title,
                author: author,
                url: url })
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`${returnedBlog.title} by ${returnedBlog.author} added`)
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

  const handleUpdateBlog = (title, author, url, likes, id) => {
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }
    // Get ID for blog?
    blogService
      .put(newBlog, id)
      .then(returnedBlog => {
        setSuccessMessage(`${returnedBlog.title} by ${returnedBlog.author} updated`)
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }).catch(error => {      // Handling of failure for person create
        setErrorMessage(
        `Blog update failed: ${error}`
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

  function compareLikes(a, b) {
    return b.likes - a.likes
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
      <Togglable buttonLabel="add blog" ref={blogFormRef} >
        <AddNewBlog handleAddNewBlog={handleAddNewBlog}/>
      </Togglable>
      <h2/>
      {blogs.sort(compareLikes).map(blog =>
        <Blog key={blog.id} blog={blog} addLike={handleUpdateBlog} />
      )}
    </div>
  )
  // useRef hookilla luodaan ref noteFormRef, joka kiinnitetään muistiinpanojen luomislomakkeen
  // sisältävälle Togglable-komponentille. Nyt siis muuttuja noteFormRef toimii viitteenä komponenttiin.

}

export default App