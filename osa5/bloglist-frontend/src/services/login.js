import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  // Käytetään HTTP-pyynnön tekemiseen nyt promisejen
  // sijaan async/await-syntaksia:
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }