const CountryList = ({ countries }) => {

    console.log(countries)

    return (
        <div>
            {countries.map(country => 
            <div> {country.name.common} </div>
            )}
        </div>
    )
}

export default CountryList