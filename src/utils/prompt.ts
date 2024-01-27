import inquirer from 'inquirer';

function Prompt () {
  function ask(question: string) {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'value',
        message: question
      }
    ])
  }

  function confirm(question: string) {
    return inquirer.prompt([
      {
        type: 'confirm',
        name: 'value',
        message: question
      }
    ])
  }

  function select(question: string, options: string[]) {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'value',
        message: question,
        choices: options
      }
    ])
  }

  return {
    ask,
    confirm,
    select
  }
}

export const prompt = Prompt()
