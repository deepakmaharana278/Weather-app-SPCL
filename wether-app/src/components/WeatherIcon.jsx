import React from 'react';
import { 
  WiDaySunny, WiNightClear,
  WiRain, WiNightRain,
  WiCloudy, WiNightAltCloudy,
  WiSnow, WiNightSnow,
  WiThunderstorm, WiNightThunderstorm,
  WiFog, WiDayCloudy
} from 'react-icons/wi';

const WeatherIcon = ({ condition, iconCode, size = 64 }) => {
  // Determine if day or night from icon code (d=day, n=night)
  const isDay = iconCode?.includes('d') ?? true;
  
  const getIcon = () => {
    const iconMap = {
      Clear: isDay ? WiDaySunny : WiNightClear,
      Rain: isDay ? WiRain : WiNightRain,
      Clouds: isDay ? WiCloudy : WiNightAltCloudy,
      Snow: isDay ? WiSnow : WiNightSnow,
      Thunderstorm: isDay ? WiThunderstorm : WiNightThunderstorm,
      Drizzle: isDay ? WiRain : WiNightRain,
      Mist: WiFog,
      Fog: WiFog,
      Haze: WiFog
    };
    
    const IconComponent = iconMap[condition] || WiDayCloudy;
    return <IconComponent size={size} className="text-yellow-300" />;
  };

  return (
    <div className="inline-block">
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;