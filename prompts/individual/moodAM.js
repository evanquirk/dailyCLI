import inquirer from 'inquirer';
import chalk from 'chalk';

export const moodAM = {
  name: 'moodAM',
  prompt: async () => {
    const { mood } = await inquirer.prompt([
      {
        type: 'number',
        name: 'moodAM',
        message: chalk.yellow('Rate your mood (1-10):'),
        validate: input => 
          (input >= 1 && input <= 10) || 
          'Please enter a number between 1 and 10',
      }
    ]);
    return { mood };
  }
};