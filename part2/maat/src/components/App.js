import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {

  const [ searchCondition, setSearchCondition ] = useState('')
  const [ countries, setCountries ] = useState([])

  const filtered = countries.filter(country => country.name.toUpperCase().startsWith(searchCondition.toUpperCase()))
  
  const showCountries = () => {
    if (filtered.length < 10) {
      if (filtered.length === 1) {
        return(
          <div>
            <h2>{filtered[0].name}</h2>
            <div> 
            capital {filtered[0].capital}
            </div>
            <div>
            population {filtered[0].population}
            </div>
            <h3>languages</h3>
            <ul>
              {filtered[0].languages.map(language =>
              <li key={language.name}>{language.name}</li>)}
            </ul>
            <div>
              <img src={filtered[0].flag} alt='maan lippu' title='maan lippu'
              width='100' height='50'/>
            </div>
          </div>
               
        )
      }
      return (
        filtered.map(country => 
        <div key={country.name}>
          {country.name}
          <button onClick={() => setSearchCondition(country.name)}>show</button>
          </div>)
      )
    }
    else {
      return(
        <div>too many matches, specify another filter</div>
      )
      }
    }

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleSearch = (event) => {
    setSearchCondition(event.target.value)
  }

  return (
    <div>
      <div>
        find countries
        <input 
        value={searchCondition}
        onChange={handleSearch}
        />
      </div>
      <div>
          {showCountries()}
      </div>
    </div>
  )
}

export default App
