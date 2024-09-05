import { number } from '@inquirer/prompts';
import chalk from 'chalk';

export const sleep = {
  name: 'sleep',
  prompt: async () => {
    const sleep = await number({
      message: chalk.yellow('How was your sleep? (1-10):'),
      validate: (input) => {
        if (input >= 1 && input <= 10) {
          return true;
        }
        return 'Please enter a number between 1 and 10';
      }
    });

    return { sleep };
  }
};