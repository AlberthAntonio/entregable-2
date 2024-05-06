import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {

    setTimeout(() => {
      setShowMessage(true)
    }, 3000);

    const succes = pos => {
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })
    }

    const error = () => {
      setHasError(true)
      setIsLoading(false)
    }

    // Api de los navegadores
    navigator.geolocation.getCurrentPosition(succes, error)
  }, [])
  
  
  useEffect(() => {
    if (coords) {
      const myApy = '7801bab1988fb82ea81bb00f774811ba'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${myApy}`
      // const url2 = `https://api.openweathermap.org/data/2.5/weather?q={cityname}&appid=${myApy}` 

      axios.get(url)
      .then(res => {
        setWeather(res.data)
        const celsius = (res.data.main.temp-273.15).toFixed(2)
        const fahrenheit = (celsius * 9/5 + 32).toFixed(2)
        setTemp({celsius, fahrenheit})
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
    }
  }, [coords])

  const inputCity = useRef()

  const handleSubmit = e => {
    e.preventDefault();
    setInputValue(inputCity.current.value);
    const myApy = '7801bab1988fb82ea81bb00f774811ba';
    const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${myApy}`;
    
    axios.get(url2)
      .then(res => {
        setWeather(res.data);
        const celsius = (res.data.main.temp - 273.15).toFixed(2);
        const fahrenheit = (celsius * 9 / 5 + 32).toFixed(2);
        setTemp({ celsius, fahrenheit });
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  
  
  console.log(weather)

  return (
    <div className='app'>
      <form className='form' onSubmit={handleSubmit}>
        <h3 className='form__title'>Ingrese pais o ciudad:</h3>
        <div className='form__input__gen'>
          <input className='form__input' ref={inputCity} type="text" />
          <button className='form__btn'>Search</button>
        </div>
      </form>
      {
        isLoading
          ? (
            <div>
              <h1>Loading...</h1>
              {
                showMessage && <p>Por favor activa tu ubicacion...</p>
              }
            </div>
            )
          : (hasError 
              ? <h1>No bloques tu ubicacion</h1>
              : (
                <WeatherCard
                weather={weather}
                temp={temp}
                />
                )
              )
      }
    </div>
  )
}

export default App
