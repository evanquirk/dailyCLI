import inquirer from 'inquirer';
import { createPrompt, useState, useKeypress, useEffect } from '@inquirer/core';
import player from 'play-sound';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const audioPlayer = player();

export const timerPrompt = createPrompt((config, done) => {
  console.log('Timer config:', JSON.stringify(config, null, 2));  // Debug log

  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  let duration = 300; // Default to 5 minutes

  if (!hasInitialized) {
    try {
      if (typeof config.duration === 'function') {
        duration = config.duration(config);
      } else if (typeof config.duration === 'number') {
        duration = config.duration;
      }
      
      duration = Math.max(1, Math.round(duration)); // Ensure duration is a positive integer
      console.log('Calculated duration:', duration, 'Type:', typeof duration);
    } catch (error) {
      console.error('Error calculating duration:', error);
      console.log('Using default duration of 5 minutes');
    }

    setHasInitialized(true);
  }

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(prevTime => {
          const newTime = prevTime + 1;
          if (newTime >= duration) {
            clearInterval(intervalId);
            setIsRunning(false);
            playSound();
            done(newTime);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, duration]);

  useKeypress((key) => {
    if (key.name === 'space' && isRunning) {
      setIsRunning(false);
      playSound();
      done(elapsedTime);
    }
  });

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return `
${typeof config.message === 'function' ? config.message(config) : config.message}
Time elapsed: ${minutes}:${seconds.toString().padStart(2, '0')}
Press spacebar to stop.
`;
});

function playSound() {
  const soundFile = path.join(__dirname, '..', 'assets', 'gong.mp3');
  audioPlayer.play(soundFile, (err) => {
    if (err) {
      console.error('Error playing sound:', err);
    }
  });
}

export function registerCustomPrompts() {
  inquirer.registerPrompt('timer', timerPrompt);
}