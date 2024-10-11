import { confirm, input } from '@inquirer/prompts';
import chalk from 'chalk';

export const breakfast = {
  name: 'breakfast',
  prompt: async () => {
    const eatBreakfast = await confirm({
      message: chalk.yellow('Did you eat breakfast?')
    });

    if (eatBreakfast) {
      const breakfast = await input({
        message: chalk.yellow('What did you have:')
      });
      return { breakfast };
    }

    return {}; // Return an empty object if no note is left
  }
};