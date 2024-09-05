import { input } from '@inquirer/prompts';
import chalk from 'chalk';

export const wake = {
  name: 'wake',
  prompt: async () => {
    const wake = await input({
      message: chalk.yellow('What time did you wake up? (24-hour format, e.g. 07:30):'),
      validate: (value) => {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (timeRegex.test(value)) {
          return true;
        }
        return 'Please enter a valid time in 24-hour format (e.g. 07:30)';
      }
    });

    return { wake };
  }
};