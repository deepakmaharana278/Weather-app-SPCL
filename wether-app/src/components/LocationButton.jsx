import React, { useState } from 'react';
// import Falocation from 'react-icons/fa';

const LocationButton = ({ onLocationDetected }) => {

  const [gettingLocation, setGettingLocation] = useState(false);

    const getCurrentLocation = () => {
      
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocoding to get city name
        try {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=1ca0aa29fc6f8679bcfa62c35662793c`
          );
          const data = await response.json();
          
          if (data.length > 0) {
            onLocationDetected(data[0].name);
          }
        } catch (error) {
          console.error('Reverse geocoding error:', error);
        } finally {
          setGettingLocation(false);
        }
      },
      (error) => {
        let message = 'Failed to get your location';
        if (error.code === 1) message = 'Location permission denied';
        else if (error.code === 2) message = 'Location unavailable';
        else if (error.code === 3) message = 'Location request timed out';
        
        alert(message);
        setGettingLocation(false);
      }
    );
  };

  return (
    <button
      onClick={getCurrentLocation}
      disabled={gettingLocation}
      className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition disabled:opacity-50"
    >
      <span className="text-xl"><i className="fa-solid fa-location-dot"></i></span>
      {gettingLocation ? 'Getting location...' : 'Use my location'}
    </button>
  );
};

export default LocationButton;