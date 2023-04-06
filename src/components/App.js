import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '6b4115ed70d76ba53101e3b29eb512e1';
const API_BASE_URL = 'https://api.openweathermap.org/data/3.0/';

function App() {
  const [city, setCity] = useState('Moscow');
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastWeatherData, setForecastWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const currentWeatherUrl = `${API_BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`;
      const currentWeatherResponse = await axios.get(currentWeatherUrl);
      setCurrentWeatherData(currentWeatherResponse.data);
      const forecastWeatherUrl = `${API_BASE_URL}onecall?lat=${currentWeatherResponse.data.coord.lat}&lon=${currentWeatherResponse.data.coord.lon}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`;
      const forecastWeatherResponse = await axios.get(forecastWeatherUrl);
      setForecastWeatherData(forecastWeatherResponse.data);
      setLoading(false);
    };
    fetchData();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <select value={city} onChange={handleCityChange}>
        <option value="Moscow">Moscow</option>
        <option value="New York">New York</option>
        <option value="London">London</option>
        <option value="Paris">Paris</option>
      </select>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Current weather for {city}</h2>
          <p>Temperature: {currentWeatherData.main.temp}°C</p>
          <p>Weather: {currentWeatherData.weather[0].main}</p>
          <h2>Forecast for {city}</h2>
          {forecastWeatherData.daily.slice(0, 5).map((dailyForecast) => (
            <div key={dailyForecast.dt}>
              <p>Date: {new Date(dailyForecast.dt * 1000).toLocaleDateString()}</p>
              <p>Temperature: {dailyForecast.temp.day}°C</p>
              <p>Weather: {dailyForecast.weather[0].main}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
