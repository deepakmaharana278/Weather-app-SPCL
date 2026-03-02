const API_KEY = '1ca0aa29fc6f8679bcfa62c35662793c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const getCoordinatesFromCity = async (city) => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
};


export const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Weather API error:', error);
    throw error;
  }
};

export const getForecast = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Forecast API error:', error);
    throw error;
  }
};

export const getAirQuality = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Air quality error:', error);
    return null; 
  }
};

export const getWeatherDataForCity = async (city) => {
  try {
    const geoData = await getCoordinatesFromCity(city);
    
    if (geoData.length === 0) {
      throw new Error('City not found');
    }
    
    const { lat, lon, name, country } = geoData[0];
    const weatherData = await getCurrentWeather(lat, lon);

    const forecastData = await getForecast(lat, lon);

    const airQualityData = await getAirQuality(lat, lon);
    
    return {
      location: { name, country, lat, lon },
      current: weatherData,
      forecast: forecastData,
      airQuality:airQualityData
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};