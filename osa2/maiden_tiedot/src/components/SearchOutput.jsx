import Notification from "./Notification"
import CountryList from "./CountryList"
import CountryInfo from "./CountryInfo"

const SearchOutput = (props) => {
    
    
    console.log(props.countryList.length)


    if (props.countryList.length > 10) {
        return (
            <Notification notification={'Too many matches, specify another filter'}/>
        )
    }

    if (props.countryList.length > 1) {
        return (
            <CountryList countries={props.countryList}/>
        )
    }

    if (props.countryList.length === 1) {
        console.log(props.countryList)
        return (
            <CountryInfo country={props.countryList[0]}/>
        )
    }

}

export default SearchOutput