import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddNewBlog from './components/AddBlog'
import Togglable from './components/Toggleable'
import LoginMenuItem from './components/LoginMenuItem'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  // Notification
  const [notification, setNotification] = useState(null)
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
        setNotification({ text: `${returnedBlog.title} by ${returnedBlog.author} added`, type: 'success' })
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }).catch(error => {      // Handling of failure for person create
        setNotification({ text: `Blog add failed: ${error}`, type: 'error' })
        setTimeout(() => {
          setNotification(null)
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
        setNotification({ text: `${returnedBlog.title} by ${returnedBlog.author} updated`, type: 'success' })
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }).catch(error => {      // Handling of failure for person create
        setNotification({ text: `Blog update failed: ${error}`, type: 'error' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const handleRemoveBlog = (id) => {
    blogService
      .remove(id)
      .then(returnedBlog => {
        setNotification({ text: `${returnedBlog.title} by ${returnedBlog.author} removed`, type: 'success' })
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }).catch(error => {      // Handling of failure for person create
        setNotification({ text: `Blog remove failed: ${error}`, type: 'error' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  function compareLikes(a, b) {
    return b.likes - a.likes
  }

  if(!blogs) {
    return null
  }

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/" sx={style}>blogs</Button>
              {user && <Button color="inherit"  component={Link} to="/addBlog" sx={style}>new blog</Button>}
              <LoginMenuItem user={user} setUser={setUser} setNotification={setNotification} style={style} />

              <Typography variant="h8" component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
                Juha&apos;s Fullstackopen blog app
              </Typography>
            </Toolbar>
          </AppBar>


        </div>
        <Notification notification={notification} />
        <Routes>
          <Route path="/" element={
            <BlogList blogs={blogs}/>
          } />
          <Route path="/login" element={
            <Login loginService={loginService} setUser={setUser} setNotification={setNotification} blogService={blogService}/>
          } />
          <Route path="/blogs/:id" element={
            <Blog blogs={blogs} userInfo={user} addLike={handleUpdateBlog} removeBlog={handleRemoveBlog} />
          } />
          <Route path="/addBlog" element={
            <AddNewBlog addBlog={handleAddNewBlog}/>
          } />

        </Routes>
      </Router>
    </Container>
  )
  // useRef hookilla luodaan ref noteFormRef, joka kiinnitetään muistiinpanojen luomislomakkeen
  // sisältävälle Togglable-komponentille. Nyt siis muuttuja noteFormRef toimii viitteenä komponenttiin.

}

export default App