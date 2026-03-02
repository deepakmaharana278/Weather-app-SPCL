import React, { useState } from "react";
import Search from "./components/Search";
import WeatherDetails from './components/WeatherDetails';
import { getWeatherDataForCity } from "./services/weatherApi";
import Forecast from './components/Forecast';

const API_KEY = '1ca0aa29fc6f8679bcfa62c35662793c';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError("");

      // API INTEGRATION HERE
      const data = await getWeatherDataForCity(city);

      setWeatherData(data);
      // console.log("Weather data received:", data);
    } catch (err) {
      setError(err.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Weather App</h1>

        <Search onSearch={handleSearch} loading={loading} />

        {loading && (
          <div className="text-center text-white mt-8">
            <div className="inline-block w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <p className="mt-2">Fetching weather data...</p>
          </div>
        )}

        {error && <div className="bg-red-500/80 text-white p-4 rounded-lg mt-8 text-center">{error}</div>}

        {weatherData && !loading && (
          <div className="mt-8">

            <WeatherDetails data={weatherData} />
            <Forecast forecastData={weatherData.forecast} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
