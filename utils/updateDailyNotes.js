import * as dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import chalk from 'chalk';
import { createDailyNoteContent } from '../helpers/dailyNoteTemplate.js';
import yaml from 'js-yaml';

dotenv.config();

const VAULT_PATH = process.env.VAULT_PATH;

if (!VAULT_PATH) {
  console.error(chalk.red('VAULT_PATH is not set in the .env file'));
  process.exit(1);
}

export async function ensureDailyNoteExists(date = new Date()) {
  const notePath = getNotePath(date);
  try {
    await fs.access(notePath);
    console.log(chalk.blue(`Daily note already exists: ${notePath}`));
    return notePath;
  } catch (error) {
    if (error.code === 'ENOENT') {
      await createDailyNote(notePath, date);
      console.log(chalk.green(`Created new daily note: ${notePath}`));
      return notePath;
    }
    throw error;
  }
}

export async function updateDailyNotes(notePath, data) {
  try {
    if (typeof notePath !== 'string') {
      throw new Error('Invalid notePath: expected a string');
    }

    let fileContent = await fs.readFile(notePath, 'utf8');
    const file = matter(fileContent);
    
    // Merge new data with existing front matter
    file.data = { ...file.data, ...data };

    // Convert the data to YAML
    const yamlData = yaml.dump(file.data, {
      styles: {
        '!!null': 'empty' // Replace null values with empty string
      },
      sortKeys: false // Preserve key order
    });

    // Construct the new file content
    const updatedContent = `---\n${yamlData}---\n\n${file.content}`;
    
    await fs.writeFile(notePath, updatedContent);

    console.log(chalk.green(`Updated ${notePath}`));
  } catch (error) {
    console.error(chalk.red(`Error updating ${notePath}:`), error);
    throw error;
  }
}

function getNotePath(date) {
  const formattedDate = format(date, 'yyyy/MM/yyyy-MM-dd');
  return path.join(VAULT_PATH, `${formattedDate}.md`);
}

async function createDailyNote(notePath, date) {
  await ensureDirectoryExists(notePath);
  const initialContent = createDailyNoteContent(date);
  await fs.writeFile(notePath, initialContent);
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