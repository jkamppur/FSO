import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@mui/material'

const LoginMenuItem = ({ user, setUser, setNotification, style }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setNotification({ text: 'user succesfully logged out', type: 'success' })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    navigate('/')
  }

  if (user?.name) {
    return ( <Button color="inherit" onClick={handleLogout} sx={style}> logout </Button>)
  } else {
    return <Button color="inherit" component={Link} to="/login" sx={style}>login</Button>
  }
}

export default LoginMenuItem
