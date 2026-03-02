import React from 'react';
import WeatherIcon from './WeatherIcon';
import { 
  WiHumidity, WiStrongWind, WiBarometer, WiThermometer,
  WiSunrise, WiSunset
} from 'react-icons/wi';

const WeatherDetails = ({ data }) => {
  if (!data) return null;

  const { current, location, airQuality } = data;
  const weatherMain = current.weather[0].main;
  const iconCode = current.weather[0].icon;
  

  const sunrise = new Date(current.sys.sunrise * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const sunset = new Date(current.sys.sunset * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Air Quality
  const getAirQualityLabel = (aqi) => {
    const levels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    const colors = ['text-green-400', 'text-yellow-400', 'text-orange-400', 'text-red-400', 'text-purple-400'];

    return {
      label: levels[aqi - 1] || 'Unknown',
      color: colors[aqi - 1] || 'text-gray-400'
    };
  };

  return (
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-white">
      <div className="text-center mb-8">
        <WeatherIcon condition={weatherMain} iconCode={iconCode} size={120} />
        <h2 className="text-3xl font-bold mt-4">
          {location.name}, {location.country}
        </h2>
        <p className="text-6xl font-black mt-2">
          {Math.round(current.main.temp)}°
        </p>
        <p className="text-xl capitalize mt-1 text-white/80">
          {current.weather[0].description}
        </p>
        <p className="text-lg mt-1">
          Feels like {Math.round(current.main.feels_like)}°
        </p>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <WiThermometer className="w-8 h-8 mx-auto text-yellow-300 mb-2" />
          <p className="text-sm text-white/70">Min/Max</p>
          <p className="text-lg font-bold">
            {Math.round(current.main.temp_min)}°/{Math.round(current.main.temp_max)}°
          </p>
        </div>
        
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <WiHumidity className="w-8 h-8 mx-auto text-blue-300 mb-2" />
          <p className="text-sm text-white/70">Humidity</p>
          <p className="text-lg font-bold">{current.main.humidity}%</p>
        </div>
        
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <WiStrongWind className="w-8 h-8 mx-auto text-gray-300 mb-2" />
          <p className="text-sm text-white/70">Wind Speed</p>
          <p className="text-lg font-bold">{current.wind.speed} m/s</p>
        </div>
        
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <WiBarometer className="w-8 h-8 mx-auto text-purple-300 mb-2" />
          <p className="text-sm text-white/70">Pressure</p>
          <p className="text-lg font-bold">{current.main.pressure} hPa</p>
        </div>
      </div>

      {airQuality && airQuality.list && (
        <div className="mb-6 bg-white/10 rounded-xl p-4">
          <p className="text-sm text-white/70 mb-2">Air Quality Index</p>
          <div className="flex items-center justify-between">
            <span className={`text-xl font-bold ${getAirQualityLabel(airQuality.list[0].main.aqi).color}`}>
              {getAirQualityLabel(airQuality.list[0].main.aqi).label}
            </span>
            <span className="text-white/50 text-sm">
              PM2.5: {Math.round(airQuality.list[0].components.pm2_5)} µg/m³
            </span>
          </div>
        </div>
      )}


      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
        <div className="text-center">
          <WiSunrise className="w-10 h-10 mx-auto text-yellow-300 mb-2" />
          <p className="text-sm text-white/70">Sunrise</p>
          <p className="text-lg font-bold">{sunrise}</p>
        </div>
        <div className="text-center">
          <WiSunset className="w-10 h-10 mx-auto text-orange-300 mb-2" />
          <p className="text-sm text-white/70">Sunset</p>
          <p className="text-lg font-bold">{sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;