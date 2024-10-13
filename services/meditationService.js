// meditationService.js

import inquirer from 'inquirer';
import chalk from 'chalk';
import readline from 'readline';
import player from 'play-sound';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const audioPlayer = player();

export async function runMeditation() {
  const { duration } = await inquirer.prompt([
    {
      type: 'number',
      name: 'duration',
      message: chalk.yellow('How many minutes would you like to meditate?'),
      default: 5,
      validate: (input) => {
        const num = Number(input);
        return (!isNaN(num) && num > 0 && num <= 60) || 'Please enter a number between 1 and 60.';
      }
    }
  ]);

  console.log(chalk.cyan(`Starting ${duration}-minute meditation. Press spacebar to stop early.`));
  
  const startTime = Date.now();
  const endTime = startTime + (duration * 60 * 1000);

  // Set up readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.emitKeypressEvents(process.stdin, rl);
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  return new Promise((resolve) => {
    const timer = setInterval(() => {
      const remainingMs = endTime - Date.now();
      if (remainingMs <= 0) {
        clearInterval(timer);
        playSound();
        finishMeditation(rl, resolve, duration);
      } else {
        const remainingMinutes = Math.floor(remainingMs / 60000);
        const remainingSeconds = Math.floor((remainingMs % 60000) / 1000);
        process.stdout.write(`\rTime remaining: ${remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    // Listen for spacebar press
    process.stdin.on('keypress', (str, key) => {
      if (key.name === 'space') {
        clearInterval(timer);
        const actualDuration = Math.floor((Date.now() - startTime) / 1000);
        playSound();
        finishMeditation(rl, resolve, actualDuration / 60);
      } else if (key.ctrl && key.name === 'c') {
        rl.close();
        process.exit();
      }
    });
  });
}

function playSound() {
  const soundFile = path.join(__dirname, '..', 'assets', 'gong.mp3');
  audioPlayer.play(soundFile, (err) => {
    if (err) {
      console.error('Error playing sound:', err);
    }
  });
}

async function finishMeditation(rl, resolve, duration) {
  console.log(chalk.green('\n\nMeditation complete!'));
  process.stdin.setRawMode(false);
  process.stdin.removeAllListeners('keypress');

  const { meditationNote } = await inquirer.prompt([
    {
      type: 'input',
      name: 'meditationNote',
      message: chalk.yellow('How do you feel after the meditation?')
    }
  ]);

  rl.close();

  resolve({ 
    bodyScanDuration: Math.round(duration * 60), // convert to seconds and round
    meditationNote 
  });
}