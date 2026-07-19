import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import AddNewBlog from './components/AddBlog'
import Togglable from './components/Toggleable'
import LoginMenuItem from './components/LoginMenuItem'
import Login from './components/Login'
import BlogList from './components/BlogList'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
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

  const handleAddNewBlog = (title, author, url) => {
    // Voimme nyt piilottaa lomakkeen kutsumalla blogFormRef.current.toggleVisibility()
    // samalla kun uuden blogin luominen tapahtuu:
    // blogFormRef.current.toggleVisibility()
    blogService
      .create({ title: title,
        author: author,
        url: url })
      .then(returnedBlog => {
        setSuccessMessage(`${returnedBlog.title} by ${returnedBlog.author} added`)
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
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

  const handleRemoveBlog = (id) => {
    blogService
      .remove(id)
      .then(returnedBlog => {
        setSuccessMessage(`${returnedBlog.title} by ${returnedBlog.author} removed`)
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }).catch(error => {      // Handling of failure for person create
        setErrorMessage(
          `Blog remove failed: ${error}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  function compareLikes(a, b) {
    return b.likes - a.likes
  }

  if(!blogs) {
    return null
  }

  return (
    <Router>
      <div>
        <Link to="/">blogs</Link> &nbsp;
        {user && (
          <>
            <Link to="/addBlog">new_blog</Link> &nbsp;
          </>
        )}
        <LoginMenuItem user={user} setUser={setUser} setSuccessMessage={setSuccessMessage} />
      </div>
      <ErrorNotification message={errorMessage}/>
      <SuccessNotification message={successMessage}/>

      <Routes>
        <Route path="/" element={
          <BlogList blogs={blogs}/>
        } />
        <Route path="/login" element={
          <Login loginService={loginService} setUser={setUser} successMessage={successMessage} setSuccessMessage={setSuccessMessage} errorMessage={errorMessage} setErrorMessage={setErrorMessage} blogService={blogService}/>
        } />
        <Route path="/blogs/:id" element={
          <Blog blogs={blogs} userInfo={user} addLike={handleUpdateBlog} removeBlog={handleRemoveBlog} />
        } />
        <Route path="/addBlog" element={
          <AddNewBlog addBlog={handleAddNewBlog}/>
        } />

      </Routes>
    </Router>
  )
  // useRef hookilla luodaan ref noteFormRef, joka kiinnitetään muistiinpanojen luomislomakkeen
  // sisältävälle Togglable-komponentille. Nyt siis muuttuja noteFormRef toimii viitteenä komponenttiin.

}

export default App