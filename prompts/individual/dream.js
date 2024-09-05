import { confirm, input } from '@inquirer/prompts';
import chalk from 'chalk';

export const dream = {
  name: 'dream',
  prompt: async () => {
    const didDream = await confirm({
      message: chalk.yellow('Did you dream?')
    });

    if (didDream) {
      const dreams = await input({
        message: chalk.yellow('Describe your dreams:')
      });
      return { dreams };
    }

    return {}; // Return an empty object if no dream was had or described
  }
};