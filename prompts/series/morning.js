import { moodAM } from '../individual/moodAM.js';
import { noteAM } from '../individual/noteAM.js';
import { wake } from '../individual/wake.js';
import { sleep } from '../individual/sleep.js';
import { dream } from '../individual/dream.js';
import { fetchWeatherData } from '../../services/weatherService.js';
import { fetchAirData } from '../../services/airService.js';

export const morning = {
  name: 'morning',
  prompts: [moodAM, noteAM, wake, sleep, dream],
  services: [ 
    { name: 'weather', func: fetchWeatherData },
    { name: 'airQuality', func: fetchAirData }
  ]
};