import axios from 'axios';
import chalk from 'chalk';
import getMoonPhaseName from '../helpers/moonPhase.js';

export async function fetchWeatherData() {
  const apiKey = process.env.VISUAL_CROSSING_API_KEY;
  const lat = process.env.LATITUDE;
  const lon = process.env.LONGITUDE;
  
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

  try {
    const response = await axios.get(url);
    const data = response.data.days[0];

    return {
      high: data.tempmax,
      low: data.tempmin,
      uvIndex: data.uvindex,
      sunrise: data.sunrise,
      sunset: data.sunset,
      moonPhase: getMoonPhaseName(data.moonphase)
    };
  } catch (error) {
    console.error(chalk.red('Error fetching weather data:'), error.message);
    return {};
  }
}