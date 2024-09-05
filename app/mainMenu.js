import inquirer from 'inquirer';
import chalk from 'chalk';

export async function showMainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: chalk.cyan('What would you like to do?'),
      choices: [
        { name: 'Run all prompts', value: 'all' },
        { name: 'Get Weather and Air Data', value: 'environment' },
        { name: 'Run Morning prompts', value: 'morning' },
        { name: 'Run Evening prompts', value: 'evening' },
        { name: 'Run Meditation', value: 'meditation' },
        { name: 'Custom selection', value: 'custom' },
        { name: 'Exit', value: 'exit' }
      ]
    }
  ]);

  return action;
}

export async function showCustomSelectionMenu(availablePrompts) {
  const { customSelection } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'customSelection',
      message: chalk.yellow('Select the prompts you want to run:'),
      choices: availablePrompts
    }
  ]);

  return customSelection;
}