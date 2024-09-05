import { fetchWeatherData } from '../../services/weatherService.js';
import { fetchAirData } from '../../services/airService.js';

export const environment = {
  name: 'environment',
  prompts: [],
  services: [ 
    { name: 'weather', func: fetchWeatherData },
    { name: 'airQuality', func: fetchAirData }
  ]
};