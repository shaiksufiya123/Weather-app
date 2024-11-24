import React, { useState } from "react";
import axios from "axios";
import "./Weather.css"; // Import the external CSS file

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // Coordinates for predefined cities
  const cityCoords = {
    "New York": { latitude: 40.7128, longitude: -74.0060 },
    London: { latitude: 51.5074, longitude: -0.1278 },
    Tokyo: { latitude: 35.6895, longitude: 139.6917 },
    Sydney: { latitude: -33.8688, longitude: 151.2093 },
  };

  const getWeather = async () => {
    if (!cityCoords[city]) {
      setError("City not found. Please choose from the predefined list.");
      setWeather(null);
      return;
    }

    const { latitude, longitude } = cityCoords[city];

    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      setWeather(response.data.current_weather);
      setError("");
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <p>Select a city to check the current weather:</p>
      <select
        className="city-select"
        onChange={(e) => setCity(e.target.value)}
        value={city}
      >
        <option value="">-- Select a city --</option>
        {Object.keys(cityCoords).map((cityName) => (
          <option key={cityName} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>
      <button className="get-weather-button" onClick={getWeather}>
        Get Weather
      </button>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-result">
          <h3>Weather in {city}:</h3>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Wind Speed: {weather.windspeed} km/h</p>
          <p>Weather Code: {weather.weathercode}</p>
          <small>(Refer to Open-Meteo weather codes for details)</small>
        </div>
      )}
    </div>
  );
};

export default Weather;
