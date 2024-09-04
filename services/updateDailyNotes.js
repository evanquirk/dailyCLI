import * as dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import chalk from 'chalk';
import { createDailyNoteContent } from '../helpers/dailyNoteTemplate.js';

dotenv.config();
const VAULT_PATH = process.env.VAULT_PATH;

if (!VAULT_PATH) {
  console.error(chalk.red('VAULT_PATH is not set in the .env file'));
  process.exit(1);
}

export async function updateDailyNotes(data) {
  const today = new Date();
  const notePath = getNotePath(today);

  try {
    await ensureDirectoryExists(notePath);

    let fileContent = await checkAndCreateDailyNote(notePath, today);

    const file = matter(fileContent);
    
    // Update front matter
    Object.assign(file.data, data);

    // Write updated content back to file
    const updatedContent = matter.stringify(file.content, file.data);
    await fs.writeFile(notePath, updatedContent);

    console.log(chalk.green(`Updated ${notePath}`));
  } catch (error) {
    console.error(chalk.red(`Error updating ${notePath}:`), error);
  }
}

function getNotePath(date) {
  const formattedDate = format(date, 'yyyy/MM/yyyy-MM-dd');
  return path.join(VAULT_PATH, `${formattedDate}.md`);
}

async function ensureDirectoryExists(filePath) {
  const directory = path.dirname(filePath);
  try {
    await fs.mkdir(directory, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function checkAndCreateDailyNote(notePath, date) {
  try {
    return await fs.readFile(notePath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(chalk.yellow(`Creating new daily note: ${notePath}`));
      const newNoteContent = createDailyNoteContent(date);
      await fs.writeFile(notePath, newNoteContent);
      return newNoteContent;
    } else {
      throw error;
    }
  }
}