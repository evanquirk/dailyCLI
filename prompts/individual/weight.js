import { number } from '@inquirer/prompts';
import chalk from 'chalk';

export const weight = {
  name: 'weight',
  prompt: async () => {
    const weight = await number({
      message: chalk.yellow('Please Enter Your Current Weight in lbs:'),
      validate: (input) => {
        if (input >= 1 && input <= 350) {
          return true;
        }
        return 'Please enter a number between 1 and 350';
      }
    });

    return { weight };
  }
};