import axios from 'axios'

const baseUrl = '/api/blogs'

var token

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {

  const config = {
    headers: { Authorization: 'Bearer ' + token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const setToken = (newToken) => {
  token = newToken
}

export default { getAll, setToken, create }