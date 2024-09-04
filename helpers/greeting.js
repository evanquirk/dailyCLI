import chalk from 'chalk';
import * as dotenv from 'dotenv';

dotenv.config();
const NAME = process.env.NAME || 'Friend';

export function getGreeting() {
  const hour = new Date().getHours();
  let timeOfDay;

  if (hour >= 5 && hour < 12) {
    timeOfDay = "morning";
  } else if (hour >= 12 && hour < 18) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "evening";
  }

  return chalk.bold.cyan(`Good ${timeOfDay}, ${NAME}!`);
}