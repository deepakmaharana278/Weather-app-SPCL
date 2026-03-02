import React from 'react';
import WeatherIcon from './WeatherIcon';

const Forecast = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) return null;

  // Filter for one forecast per day (every 8th item for 3-hour intervals)
  const dailyForecast = forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  const getDayName = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-white mt-6">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <span className="w-1 h-6 bg-yellow-300 rounded-full mr-3"></span>
        5-Day Forecast
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecast.map((day, index) => (
          <div 
            key={index} 
            className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300"
          >
            <p className="font-semibold text-sm mb-2">
              {getDayName(day.dt)}
            </p>
            
            <WeatherIcon 
              condition={day.weather[0].main}
              iconCode={day.weather[0].icon}
              size={48}
            />
            
            <p className="text-2xl font-bold mt-2">
              {Math.round(day.main.temp)}°
            </p>
            
            <p className="text-xs text-white/70 capitalize mt-1">
              {day.weather[0].main}
            </p>
            
            <div className="flex justify-center gap-2 mt-2 text-xs">
              <span className="text-yellow-300">↑{Math.round(day.main.temp_max)}°</span>
              <span className="text-white/30">|</span>
              <span className="text-blue-300">↓{Math.round(day.main.temp_min)}°</span>
            </div>
            
            <div className="mt-2 text-xs text-white/50">
              💧 {day.main.humidity}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;