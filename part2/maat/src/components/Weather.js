import React, { useEffect, useState } from 'react'
import axios from 'axios'

/*
* API:n hakemisessa ongelmia ATM.
* Problems with fetching API ATM.
*/

const Weather = (props) => {
    console.log(props)
    const [ weather, setWeather ] = useState(null)
    const api_key = process.env.REACT_APP_API_KEY
    const capital = props.capital
    useEffect(() => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
        .then(response => {
            setWeather(response.data)
            console.log(response.data)
        })
    }, null)

    if (weather === undefined || weather === null) {
        return null
    }
    else {
        console.log(weather)
        return (
            <div>
                <div>
                    <h3>Weather in {capital}</h3>
                </div>
                <div>
                <h4>Temperature: </h4>
                    {weather.current.temperature} celsius
                </div>
                <div>
                    <img src={weather.current.weather_icons[0]} alt="" title="Weather as an image"/>
                </div>
                <div>
                    <h4>Wind: </h4>
                    {weather.current.wind_speed} mph direction {weather.current.wind_dir}
                </div>
            </div>
        )
    }
}

export default Weather