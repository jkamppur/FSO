import Notification from "./Notification"
import CountryList from "./CountryList"
import CountryInfo from "./CountryInfo"

const SearchOutput = (props) => {
    
    
    if (props.countryList.length > 10) {
        return (
            <Notification notification={'Too many matches, specify another filter'}/>
        )
    }

    if (props.countryList.length > 1) {
        return (
            <CountryList countries={props.countryList} showCountry={props.showCountry}/>
        )
    }

    if (props.countryList.length === 1) {
        return (
            <CountryInfo country={props.countryList[0]}/>
        )
    }
}

export default SearchOutput