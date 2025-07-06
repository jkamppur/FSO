import axios from 'axios'

const baseUrl = '/api/blogs'

var token

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {

  const config = {
    headers: { Authorization: 'Bearer ' + token },
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = newToken
}

export default { getAll, setToken, create }