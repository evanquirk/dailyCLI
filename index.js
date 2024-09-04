import * as dotenv from 'dotenv';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { updateDailyNotes } from './services/updateDailyNotes.js';
import { fetchWeatherData } from './services/weatherService.js';
import { fetchAirData } from './services/airService.js';
import { getGreeting } from './helpers/greeting.js';
import { getMainPrompt } from './prompts/mainPrompt.js';
import { getDailyPrompts } from './prompts/dailyPrompts.js';

// Load environment variables
dotenv.config();

async function collectInputs() {
  console.log(getGreeting());
  return inquirer.prompt(getDailyPrompts());
}

async function runUpdate() {
  try {
    console.log(chalk.blue('Fetching weather data...'));
    const weatherData = await fetchWeatherData();
    
    console.log(chalk.blue('Fetching air quality data...'));
    const airData = await fetchAirData();
    
    console.log(chalk.green('Please answer the following questions:'));
    const userInputs = await collectInputs();
    
    const allData = {
      ...weatherData,
      ...airData,
      ...userInputs
    };

    await updateDailyNotes(allData);
    console.log(chalk.green.bold('Daily note updated successfully!'));
  } catch (error) {
    console.error(chalk.red('An error occurred:'), error);
  }
}

async function main() {
  const { action } = await inquirer.prompt(getMainPrompt());

  switch (action) {
    case 'now':
      await runUpdate();
      break;
    case 'schedule':
      console.log(chalk.yellow('Scheduling feature is not implemented yet.'));
      // TODO: Implement scheduling logic
      break;
    case 'exit':
      console.log(chalk.blue('Goodbye!'));
      process.exit(0);
  }
}

main().catch(error => {
  console.error(chalk.red('An unhandled error occurred:'), error);
  process.exit(1);
});