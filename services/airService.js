import axios from 'axios';
import chalk from 'chalk';

export async function fetchAirData() {
  const lat = process.env.LATITUDE;
  const lon = process.env.LONGITUDE;
  
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,european_aqi,us_aqi`;

  try {
    const response = await axios.get(url);
    const data = response.data.hourly;

    // Calculate daily averages
    const calculateAverage = (arr) => arr.reduce((sum, val) => sum + val, 0) / arr.length;

    return {
      avPm10: Number(calculateAverage(data.pm10).toFixed(2)),
      avPm25: Number(calculateAverage(data.pm2_5).toFixed(2)),
      avCO: Number(calculateAverage(data.carbon_monoxide).toFixed(2)),
      avNO2: Number(calculateAverage(data.nitrogen_dioxide).toFixed(2)),
      avEuAqi: Number(calculateAverage(data.european_aqi).toFixed(2)),
      avUsAqi: Number(calculateAverage(data.us_aqi).toFixed(2))
    };
  } catch (error) {
    console.error(chalk.red('Error fetching air quality data:'), error.message);
    return {};
  }
}