import chalk from 'chalk';
import * as dotenv from 'dotenv';
import { format } from 'date-fns';

dotenv.config();
const NAME = process.env.NAME || 'Friend';

export function getGreeting() {
  const now = new Date();
  const hour = now.getHours();
  let timeOfDay;

  if (hour >= 5 && hour < 12) {
    timeOfDay = "morning";
  } else if (hour >= 12 && hour < 18) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "evening";
  }

  const dayName = format(now, 'EEEE');
  const formattedDate = format(now, 'MMMM d');
  const formattedTime = format(now, 'h:mm a');

  return chalk.bold.cyan(`Good ${timeOfDay}, ${NAME}!`) + 
         chalk.cyan(`\nIt's ${dayName}, ${formattedDate} at ${formattedTime}.`);
}