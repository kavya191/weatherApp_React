import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Components/WeatherDisplay.css'
import { GrClearOption } from "react-icons/gr";
import { IoMdCloud } from "react-icons/io";
import { FaCloudRain } from "react-icons/fa";
import { WiNightSnowThunderstorm } from "react-icons/wi";
import Button from 'react-bootstrap/Button';

const WeatherDisplay = () => {
    const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [backgroundClass, setBackgroundClass] = useState('');
  const apiKey = "9265b7e32e3ceb7b4a0e4e5c65a199ee";



  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      setWeather(response.data);
      setBackgroundClass(getBackgroundClass(response.data.weather[0].main));
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };
  
  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const convertToFahrenheit = (kelvin) => {
    return (kelvin - 273.15) * 9 / 5 + 32;
  };

  const renderTemperature = () => {
    if (!weather) return null;
    const temperature = isCelsius ? convertToCelsius(weather.main.temp) : convertToFahrenheit(weather.main.temp);
    return `${temperature.toFixed(2)} ${isCelsius ? '°C' : '°F'}`;
  };  
  const getBackgroundClass = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        return 'clear';
      case 'clouds':
        return 'clouds';
      case 'rain':
        return 'rain';
      case 'snow':
        return 'snow';
      // Add more cases for other weather conditions
      default:
        return '';
    }
  };

    const renderWeatherIcon = () => {
        if (!weather) return null;
    
        const weatherCondition = weather.weather[0].main.toLowerCase();
    
        switch (weatherCondition) {
          case 'clear':
            return <GrClearOption />;
          case 'clouds':
            return <IoMdCloud />;
          case 'rain':
            return <FaCloudRain />;
          case 'snow':
            return <WiNightSnowThunderstorm />;
         
          default:
            return null;
        }
      };
  return (
    <div className="app_weather">
    <div className={`weather-app ${backgroundClass}`}>
      <h1 className="title">Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input className="b-0 p-1"
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleChange}
        />
        <Button className="ms-1" type="submit">Get Weather</Button>
      </form>
      {weather && (
        <div>
          <h2 className="data">Weather in {weather.name}, {weather.sys.country}</h2>
          <p className="data">Temperature: {renderTemperature()}</p>
        <renderWeatherIcon/>
          <p className="data">Weather Conditions: {weather.weather[0].description}</p>
         
          <Button  onClick={toggleUnit}>Toggle</Button>
        </div>
      )}
    </div>
    </div>
  );
};

export default WeatherDisplay;
