import React, { useState } from 'react'
import './styles/WeatherCard.css'

const WeatherCard = ({ weather, temp }) => {

  const [isCelsius, setIsCelsius] = useState(true)  

  const changeTemperature = () => {
    setIsCelsius(!isCelsius)
  }  

  return (
    <article className='card'>
        <h1 className='card__title'>Weather App</h1>
        <h2 className='card__country'>{weather?.name}, {weather?.sys.country}</h2>
        <section className='card__body'>
            <div className='card__image-container'>
                <img className='card__image' src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            </div>
            <article className='info'>
                <h3 className='info__title'>{weather?.weather[0].description}</h3>
                <ul className='info__list'>
                    <li className='info__item'>
                      <span className='info__label'>Wind Speed: </span>
                      <span className='info__value'>{weather?.wind.speed} m/s</span></li>
                    <li className='info__item'>
                      <span className='info__label'>Clouds: </span>
                      <span className='info__value'>{weather?.clouds.all} %</span></li>
                    <li className='info__item'>
                      <span className='info__label'>Pressure: </span>
                      <span className='info__value'>{weather?.main.pressure} hPa</span></li>
                    <li className='info__item'>
                      <span className='info__label'>Humidity: </span>
                      <span className='info__value'>{weather?.main.humidity} %</span></li>
                </ul>
            </article>
        </section>
        <h2 className='card__temp'>{isCelsius ? `${temp?.celsius} °C` : `${temp?.fahrenheit} °F`}</h2>
        <button className='card__btn' onClick={changeTemperature}>Change to {isCelsius ? '°F' : '°C'}</button>
    </article>
  )
}

export default WeatherCard