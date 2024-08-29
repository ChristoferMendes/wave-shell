import * as readline from 'node:readline';
import { waveColors } from './color';

export function Prompt() {
  function createRl() {
    return readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  function ask(question: string): Promise<string> {
    const rl = createRl();

    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        rl.pause();
        resolve(answer);
      });
    });
  }

  function confirm(question: string): Promise<boolean> {
    const rl = createRl();

    return new Promise((resolve) => {
      rl.question(`${question} (y/n) `, (answer) => {
        rl.close();
        resolve(answer.toLowerCase().startsWith('y'));
      });
    });
  }

  function select<T>(question: string, options: { label: string; value: T }[]): Promise<T> {
    const rl = createRl();

    let index = 0;
    let isSelected = false;

    function clearScreen() {
      readline.cursorTo(process.stdout, 0, 0);
      readline.clearScreenDown(process.stdout);
    }

    function writeQuestion() {
      process.stdout.write(`${question}\n`);
    }

    function handleWriteSelectedOption(optionColored: string, i: number) {
      const withOptionSelected = i === index ? waveColors.green('✔ ') : ' ';

      return process.stdout.write(`${withOptionSelected}${optionColored}\n`);
    }

    function writeOptions() {
      options.forEach((option, i) => {
        const optionColored = i === index ? waveColors.green(option.label) : waveColors.white(option.label);
        const prefix = i === index ? '\x1b[32m> ' : ' ';

        if (!isSelected) {
          process.stdout.write(`${prefix}${optionColored}\n`);
          return;
        }

        handleWriteSelectedOption(optionColored, i);
      });
    }

    function handleKeyPress(key: { name: string }, resolve: (value: T | PromiseLike<T>) => void) {
      const UP_INDEX_CHANGE = -1;
      const DOWN_INDEX_CHANGE = 1;
      const MIN_INDEX = 0;
      const MAX_INDEX = options.length - 1;

      if (key.name === 'up') index = Math.max(index + UP_INDEX_CHANGE, MIN_INDEX);
      else if (key.name === 'down') index = Math.min(index + DOWN_INDEX_CHANGE, MAX_INDEX);
      else if (key.name === 'return') {
        process.stdin.removeAllListeners('keypress');
        rl.pause();
        isSelected = true;
        const value = options[index].value;
        resolve(value);
      }
      render();
    }

    function render() {
      clearScreen();
      writeQuestion();
      writeOptions();
    }

    return new Promise((resolve) => {
      process.stdin.on('keypress', (_, key) => handleKeyPress(key, resolve));
      render();
    });
  }

  return {
    ask,
    confirm,
    select
  };
}

export const prompt = Prompt();
