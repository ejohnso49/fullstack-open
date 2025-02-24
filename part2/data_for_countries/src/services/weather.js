import axios from 'axios';

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeatherUrl = (lat, lon) => {
  return `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
};

const getWeather = (lat, lon) => {
  return axios.get(getWeatherUrl(lat, lon)).then(response => response.data);
};

export default getWeather;
