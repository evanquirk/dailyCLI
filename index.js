import chalk from 'chalk';
import { showMainMenu, showCustomSelectionMenu } from './app/mainMenu.js';
import { runPrompts } from './utils/promptRunner.js';
import { ensureDailyNoteExists, updateDailyNotes } from './utils/updateDailyNotes.js';
import * as prompts from './prompts/index.js';
import { getGreeting } from './utils/greeting.js';

async function main() {
  console.log(chalk.cyan(getGreeting()));

  while (true) {
    const action = await showMainMenu();

    if (action === 'exit') {
      console.log(chalk.blue('Goodbye!'));
      return;
    }

    try {
      let allData;
      if (action === 'custom') {
        const availablePrompts = Object.keys(prompts).filter(key => typeof prompts[key].prompt === 'function');
        const customSelection = await showCustomSelectionMenu(availablePrompts);
        allData = await runPrompts(customSelection);
      } else if (action === 'all') {
        allData = await runPrompts();
      } else {
        allData = await runPrompts(action);
      }

      const notePath = await ensureDailyNoteExists();
      await updateDailyNotes(notePath, allData);
      console.log(chalk.green('Daily note updated successfully!'));
    } catch (error) {
      console.error(chalk.red('An error occurred:'), error);
      console.log(chalk.yellow('Failed to update daily note.'));
    }

    console.log(chalk.cyan('\nReturning to main menu...\n'));
  }
}

main().catch(console.error);