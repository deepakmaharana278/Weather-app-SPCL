import React from 'react';
import WeatherIcon from './WeatherIcon';
import {WiHumidity} from 'react-icons/wi'

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
    <div className="bg-linear-to-br from-white/20 to-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 md:p-8 text-white mt-8 shadow-xl">

  <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center tracking-wide">
    <span className="w-1.5 h-7 bg-yellow-400 rounded-full mr-4"></span>
    5-Day Forecast
  </h3>

  {/* MOBILE = horizontal scroll | DESKTOP = grid */}
  <div className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto md:overflow-visible pb-4 scrollbar-hide">

    {dailyForecast.map((day, index) => (
      <div
        key={index}
        className="min-w-35 md:min-w-0 group bg-white/10 border border-white/10 rounded-2xl p-4 md:p-5 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer shadow-md shrink-0"
      >

        {/* Day Name */}
        <p className="font-semibold text-sm mb-2 text-white/80 group-hover:text-white transition">
          {getDayName(day.dt)}
        </p>

        {/* Weather Icon */}
        <div className="flex justify-center">
          <WeatherIcon
            condition={day.weather[0].main}
            iconCode={day.weather[0].icon}
            size={45}
          />
        </div>

        {/* Temperature */}
        <p className="text-2xl md:text-3xl font-bold mt-2 bg-linear-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
          {Math.round(day.main.temp)}°
        </p>

        {/* Description */}
        <p className="text-xs text-white/70 capitalize mt-1 tracking-wide">
          {day.weather[0].description}
        </p>

        {/* Min / Max */}
        <div className="flex justify-center items-center gap-3 mt-3 text-xs">
          <span className="flex items-center gap-1 text-yellow-300">
            <i className="fa-solid fa-arrow-up text-[10px]"></i>
            {Math.round(day.main.temp_max)}°
          </span>

          <span className="text-white/30">|</span>

          <span className="flex items-center gap-1 text-blue-300">
            <i className="fa-solid fa-arrow-down text-[10px]"></i>
            {Math.round(day.main.temp_min)}°
          </span>
        </div>

        {/* Humidity */}
        <div className="flex justify-center items-center gap-1 mt-3 text-xs text-white/60">
          <WiHumidity size={18} />
          {day.main.humidity}%
        </div>

      </div>
    ))}
  </div>
</div>
  );
};

export default Forecast;