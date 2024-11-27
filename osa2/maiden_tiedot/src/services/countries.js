import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
  const request = axios.get(baseUrl + 'api/all')
  return request.then(response => response.data)
}

const getWeather = (lat, long) => {
    const request = axios.get('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' +lat + '&lon=' + long + '&appid='+ api_key)
    return request.then(response => response.data)
}

export default {
    getAll,
    getWeather
}