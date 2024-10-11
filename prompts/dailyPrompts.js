import inquirer from 'inquirer';
import chalk from 'chalk';
import { registerCustomPrompts } from './customPrompts.js';

registerCustomPrompts();

export function getDailyPrompts() {
  return [
    {
      type: 'number',
      name: 'moodAM',
      message: chalk.yellow('How are you feeling today? (1-10):'),
      validate: input => 
        (input >= 1 && input <= 10) || 
        'Please enter a number between 1 and 10',
    },
    {
      type: 'confirm',
      name: 'noteAM',
      message: chalk.yellow('Care to elaborate?'),
    },
    {
      type: 'input',
      name: 'noteAM',
      message: chalk.yellow('Please elaborate on your mood:'),
      when: (answers) => answers.elaborateMood,
    },
    {
      type: 'input',
      name: 'wake',
      message: chalk.yellow('What time did you wake up? (24-hour format, e.g. 07:30):'),
      validate: (input) => {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timeRegex.test(input) || 'Please enter a valid time in 24-hour format (e.g. 07:30)';
      },
    },
    {
      type: 'number',
      name: 'sleep',
      message: chalk.yellow('How was your sleep? (1-10):'),
      validate: input => 
        (input >= 1 && input <= 10) || 
        'Please enter a number between 1 and 10',
    },
    {
      type: 'confirm',
      name: 'didDream',
      message: chalk.yellow('Did you dream?'),
    },
    {
      type: 'input',
      name: 'dreams',
      message: chalk.yellow('Describe your dreams:'),
      when: (answers) => answers.didDream,
    }
  ];
}