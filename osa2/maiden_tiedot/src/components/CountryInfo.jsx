const CountryInfo = ({ country }) => {

    console.log(Object.values(country.languages))

    return (
        <div>
            <h2>{country.name.common} </h2>
            <div>capital {country.capital} </div>
            <div>area {country.area} </div>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map(language =>
                    <li>{language}</li>
                )}
            </ul>    
            <picture>
                <img src={country.flags.png} width="200" />
            </picture>
            
        </div>
    )
}
  
export default CountryInfo