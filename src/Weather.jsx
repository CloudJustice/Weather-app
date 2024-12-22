import snowy from './assets/iconic/snowy.png';
import broken_clouds from './assets/iconic/Windy.png';
import cloudy from './assets/iconic/cloudy.png';
import night from './assets/iconic/night.png';
import stormy from './assets/iconic/stormy.png';
import rainy from './assets/iconic/rainy.png';
import clear from './assets/iconic/clear sky.png';
import mist from './assets/iconic/mist.png';
import sunny from './assets/iconic/sunny.png';
import scattered_clouds from './assets/iconic/scattered clouds.png';
import { useEffect, useRef, useState } from 'react';


const Weather = () => {
  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(false);

  const allIcons ={
    '01d': clear,
    '01n': clear,
    '02d': cloudy,
    '03d': scattered_clouds,
    '03n': scattered_clouds,
    '04d': broken_clouds,
    '04n': broken_clouds,
    '09d': rainy,
    '09n': rainy,
    '10d': rainy,
    '10n': rainy,
    '11d': stormy,
    '11n': stormy,
    '13d': snowy,
    '13n': snowy,
    '50d': mist,
    '50n': mist
  }

  const search = async (city) => {
    if (city === '') {
      //alert('Enter City name');
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const responce = await fetch(url);
      const data = await responce.json();

      //if (responce.ok) {
        //alert(data.message);
        //return;
      //}

      console.log(data);
      const icon = allIcons[data.weather[0].icon]|| clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
        

      })
      
    } catch (error) {
      setWeatherData(false);
      console.error('Error in fetching weather data');
    }
  }

  useEffect(() => {
    search('')
  })

  return(<>
  <div className="content">
    
    <div className="weather_card">
      <div className="search">
        <input ref={inputRef} type="text" placeholder=" Search Location" />
        <button onClick={()=>search(inputRef.current.value)}>🔍</button>
      </div>
      {weatherData?<>
        <img src={weatherData.icon} alt="image" className="weather_icon" />
      <div className="temprature">{weatherData.temprature}°C</div>
      <div className="locatoion">{weatherData.location}</div>
      <div className="details">
        <div>
          {weatherData.humidity}%
          <span>Humidity</span>
        </div>
        <div>
          {weatherData.windSpeed} km/h
          <span>Wind Speed</span>
        </div>
      </div>
    
      </>:<></>}
    
    </div>
  </div>
  </>)
}

export default Weather