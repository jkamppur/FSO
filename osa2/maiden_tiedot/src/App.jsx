import { useState, useEffect } from 'react'
import countryService from './services/countries.js'
import SearchOutput from  './components/SearchOutput'

const App = () => {

  const [countryList, setCountryList] = useState([])
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountryList(response)
      })
  }, [])

  // Filter countries to be shown
  const countriesToShow =  
    countryList.filter(country => country.name.common.toLowerCase().includes(searchKey.toLowerCase()))

  const handleSeachKeyChange = (event) => {
    setSearchKey(event.target.value)
  }

  return (
    <div>
      find countries &nbsp;
      <input value={searchKey} onChange={handleSeachKeyChange} />
      <SearchOutput countryList={countriesToShow} showCountry={setSearchKey}/>
    </div>
  )

}

export default App
