import { useState, useEffect } from 'react'
import countryService from '../services/countries.js'

const CountryInfo = ({ country }) => {

    const [temp, setTemp] = useState('-')
    const [wind, setWind] = useState('-')
    const [weatherLocation, setWeatherLocation] = useState('-')
    const [icon, setIcon] = useState('')


    useEffect(() => {
    countryService
      .getWeather(country.latlng[0], country.latlng[1])
      .then(response => {
        setTemp(response.main.temp)
        setWind(response.wind.speed)
        setWeatherLocation(response.name)
        setIcon("https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
      })
    }, [])

    return (
        <div>
            <h1>{country.name.common} </h1>
            <div>capital {country.capital} </div>
            <div>area {country.area} </div>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map(language =>
                    <li key={language}>  {language}</li>
                )}
            </ul>    
            <picture>
                <img src={country.flags.svg} width="200" border="1px" />
            </picture>
            <h2>Weather in {weatherLocation}</h2>
            <div>temperature {temp} Celsius</div>
            <picture>
                <img src={icon} width="100"/>
            </picture>
            <div>wind {wind} m/s</div>
        </div>
    )
}

export default CountryInfo