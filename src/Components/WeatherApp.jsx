import React, { useState } from 'react'
import "./WeatherApp.css"

import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import humidity_icon from '../Assets/humidity.png'
import wind_icon from '../Assets/wind.png'
import cloud_icon from '../Assets/cloud.png'

const WeatherApp = () => {

  let api_key = "ca8ab64c8aa212cc390eed9fddc35569"

  const [weatherIcon, setWeatherIcon] = useState(clear_icon)

  const search = async () => {
    const element = document.getElementsByClassName("cityInput")
    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

    let response = await fetch(url)
    let data = await response.json()

    const humidity = document.getElementsByClassName("humidity-percent")
    const wind = document.getElementsByClassName("wind-rate")
    const temprature = document.getElementsByClassName("weather-temp")
    const location = document.getElementsByClassName("weather-location")

    humidity[0].innerHTML = Math.floor(data.main.humidity) + "%";
    wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
    temprature[0].innerHTML = Math.floor(data.main.temp) + "c"
    location[0].innerHTML = data.name

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") { setWeatherIcon(clear_icon) }
    else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") { setWeatherIcon(cloud_icon) }
    else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") { setWeatherIcon(drizzle_icon) }
    else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") { setWeatherIcon(drizzle_icon) }
    else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") { setWeatherIcon(rain_icon) }
    else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") { setWeatherIcon(snow_icon) }
    else {setWeatherIcon(clear_icon)}
  }

  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='search' />
        <div className="search-icon">
          <img src={search_icon} alt="search icon" onClick={() => { search() }} />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherIcon} alt="icon" />
      </div>
      <div className="weather-temp">24 c</div>
      <div className="weather-location">Cairo</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">35%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">10 KM/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp