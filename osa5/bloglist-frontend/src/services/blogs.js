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

const put = async (updatedBlog, id) => {

  const config = {
    headers: { Authorization: 'Bearer ' + token },
  }

  const response = await axios.put(baseUrl + '/' + id, updatedBlog, config)

  return response.data

}

const remove = async (id) => {

  const config = {
    headers: { Authorization: 'Bearer ' + token },
  }

  const response = await axios.delete(baseUrl + '/' + id, config)

  return response.data

}


export default { getAll, setToken, create, put, remove }