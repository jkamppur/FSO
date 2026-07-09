import { useNavigate, Link } from 'react-router-dom'

const LoginMenuItem = ({ user, setUser, setSuccessMessage }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setSuccessMessage('user succesfully logged out')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    navigate('/')
  }

  if (user?.name) {
    return ( <button onClick={handleLogout}> logout </button>)
  } else {
    return <Link to="/login">login</Link>
  }
}

export default LoginMenuItem
