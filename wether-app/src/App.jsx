import React, { useState,useEffect } from "react";
import Search from "./components/Search";
import WeatherDetails from "./components/WeatherDetails";
import { getWeatherDataForCity } from "./services/weatherApi";
import Forecast from "./components/Forecast";
import LocationButton from './components/LocationButton';


const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    handleSearch('Bhubaneswar');
  }, []);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError("");

      // API INTEGRATION HERE
      const data = await getWeatherDataForCity(city);

      setWeatherData(data);
      // console.log("Weather data received:", data);
    } catch (err) {
      if (err.message === "City not found") {
        setError(`City "${ city }" not found. Please check the spelling and try again.`);
        
      } else if (err.message.includes("Failed to fetch")) {
        setError("Network error. Please check your internet connection.");

      } else {
        setError(err.message || "Failed to fetch weather data");

      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-4">Weather App</h1>
        <p className="text-white/80 text-center mb-8">
          Real-time weather & 5-day forecast for any city
        </p>

        <Search onSearch={handleSearch} loading={loading} />
        <div className="mt-5 flex justify-center">
          <LocationButton onLocationDetected={handleSearch} />
        </div>
        

        {loading && (
          <div className="text-center text-white mt-6">
            <div className="relative inline-block">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🌤️</span>
              </div>
            </div>
            <p className="mt-4 text-lg">Fetching weather data for your city...</p>
            <p className="text-sm text-white/50">This may take a moment</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/90 backdrop-blur text-white p-6 rounded-xl mt-8 text-center max-w-md mx-auto">
            <span className="text-4xl block mb-3">⚠️</span>
            <p className="text-lg">{error}</p>
            <button 
              onClick={() => setError('')}
              className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm"
            >
              Dismiss
            </button>
          </div>
        )}

        {weatherData && !loading && (
          <div className="mt-5">
            <WeatherDetails data={weatherData} />
            <Forecast forecastData={weatherData.forecast} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
