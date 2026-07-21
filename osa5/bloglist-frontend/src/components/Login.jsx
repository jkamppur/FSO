import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const Login = ({ loginService, setUser, setNotification, blogService }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

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
      setNotification({ text: 'user succesfully logged in', type: 'success' })
      navigate('/')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({ text: 'wrong credentials', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            value={username}
            label="Username"
            variant="standard"
            // Muutoksenkäsittelijä on yksinkertainen, se destrukturoi
            // parametrina tulevasta oliosta kentän target ja asettaa sen
            // arvon vastaavaan tilaan
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            value={password}
            label="Password"
            variant="standard"
            type="password"
            // Muutoksenkäsittelijä on yksinkertainen, se destrukturoi
            // parametrina tulevasta oliosta kentän target ja asettaa sen
            // arvon vastaavaan tilaan
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          login
        </Button>
      </form>
    </div>
  )
}

export default Login