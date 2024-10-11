import inquirer from 'inquirer';
import chalk from 'chalk';

export function getMainPrompt() {
  return [
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: 'Run full daily update', value: 'now' },
        { name: 'Quick update (weather & air quality only)', value: 'quick' },
        { name: 'Start meditation timer', value: 'meditate' },
        { name: 'Create empty daily note file', value: 'create' },
        { name: 'Schedule daily updates', value: 'schedule' },
        { name: 'Exit', value: 'exit' }
      ]
    }
  ];
}