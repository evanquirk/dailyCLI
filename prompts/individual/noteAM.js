import { confirm, input } from '@inquirer/prompts';
import chalk from 'chalk';

export const noteAM = {
  name: 'noteAM',
  prompt: async () => {
    const wantToLeaveNote = await confirm({
      message: chalk.yellow('Would you like to leave a note for today?')
    });

    if (wantToLeaveNote) {
      const noteAM = await input({
        message: chalk.yellow('Please enter your note:')
      });
      return { noteAM };
    }

    return {}; // Return an empty object if no note is left
  }
};