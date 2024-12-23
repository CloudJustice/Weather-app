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
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const allIcons = {
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
    '50n': mist,
  };

  const search = async (city) => {
    if (city === '') return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      const icon = allIcons[data.weather[0]?.icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error('Error in fetching weather data');
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`;
      const response = await fetch(url, {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      });
      const data = await response.json();
      setSuggestions(data.data.map((item) => `${item.city}, ${item.country}`));
    } catch (error) {
      console.error('Error in fetching suggestions:', error);
    }
  };

  useEffect(() => {
    search('');
  }, []);

  return (
    <div className="content">
      <div className="weather_card">
        <div className="search">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Location"
            onChange={(e) => fetchSuggestions(e.target.value)}
          />
          <button onClick={() => search(inputRef.current.value)}>🔍</button>
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    inputRef.current.value = suggestion;
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        {weatherData ? (
          <>
            <img src={weatherData.icon} alt="weather icon" className="weather_icon" />
            <div className="temprature">{weatherData.temprature}°C</div>
            <div className="location">{weatherData.location}</div>
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
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Weather;