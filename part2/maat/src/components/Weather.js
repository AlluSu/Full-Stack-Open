import react, { useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
const [ weather, setWeather ] = useState([])
//console.log(props)
const api_key = process.env.REACT_APP_API_KEY
const capital = props.capital
useEffect(() => 
axios
.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
.then(response => {
  setWeather(response.data)
  //console.log(response.data)
}, []))

return(
    <div>
    <h3>Weather in {capital}</h3>
    {weather}
    </div>
)

}

export default Weather