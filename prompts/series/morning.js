import { moodAM } from '../individual/moodAM.js';
import { noteAM } from '../individual/noteAM.js';
import { wake } from '../individual/wake.js';
import { sleep } from '../individual/sleep.js';
import { dream } from '../individual/dream.js';
import { fetchWeatherData } from '../../services/weatherService.js';
import { fetchAirData } from '../../services/airService.js';
import { breakfast } from '../individual/breakfast.js';
import { weight } from '../individual/weight.js';
import { workout } from '../individual/workout.js';
import { tasks } from '../individual/tasks.js';

export const morning = {
  name: 'morning',
  prompts: [moodAM, noteAM, wake, sleep, dream, breakfast, weight, workout, tasks],
  services: [ 
    { name: 'weather', func: fetchWeatherData },
    { name: 'airQuality', func: fetchAirData }
  ]
};