import { confirm, input } from '@inquirer/prompts';
import chalk from 'chalk';

// Helper function to process task input
const processTaskInput = (tasks) => {
  const taskList = tasks.split(',,').map(item => item.trim());
  return taskList.length > 1 ? taskList : tasks;
};

export const tasks = {
  name: 'tasks',
  prompt: async () => {
    const addTasks = await confirm({
      message: chalk.yellow('Any tasks you need to complete today?')
    });

    if (addTasks) {
      const tasks = await input({
        message: chalk.yellow('List your tasks to complete. Use double commas to separate tasks:')
      });

      return { tasks: processTaskInput(tasks) };
    }

    return {}; // Return an empty object if no tasks were added
  }
};