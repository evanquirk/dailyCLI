import { confirm, input } from '@inquirer/prompts';
import chalk from 'chalk';

export const workout = {
  name: 'workout',
  prompt: async () => {
    const didWorkout = await confirm({
      message: chalk.yellow('Did you workout today?')
    });

    if (didWorkout) {
      const workout = await input({
        message: chalk.yellow('Which workout did you complete?:')
      });
      return { workout };
    }

    return {}; // Return an empty object if no dream was had or described
  }
};