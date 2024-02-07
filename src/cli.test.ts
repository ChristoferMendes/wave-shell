import { beforeEach, describe, expect, it, jest, spyOn } from 'bun:test';
import { join } from 'path';
import { Cli } from './cli';
import { WavePrint } from './utils/print';

const print = WavePrint();
const projectRoot = join(__dirname, '../')

function clearCommand() {
  process.argv.pop();
}

function setCommandIntoArgv(command: string) {
  process.argv.push(command);
}

describe('Cli', () => {
  let cli: Cli;

  beforeEach(() => {
    cli = new Cli('wave-shell', projectRoot);
    const hasCommand = process.argv.length > 2;

    if (hasCommand) {
      clearCommand();
    }
  });


  it('should display help when no command is provided', async () => {
    const printTable = spyOn(cli['print'], 'table');

    await cli.run();
    print.clearLastLines(5);
    
    expect(printTable).toHaveBeenCalledWith(cli['_getHelpTableData'], {
      head: ['Command', 'Description'],
    });
  });

  it('should run a command', async () => {
    const command = 'tMock'
    cli['commands'].set(command, {
      run: jest.fn()
    })

    setCommandIntoArgv(command);

    await cli.run();

    expect(cli['commands'].get(command)?.run).toHaveBeenCalled();
  });

  it('should suggest a command if it does not exist', async () => {
    const command = 'helloMoc';

    cli['commands'].set('helloMock', {
      run: jest.fn()
    })
    
    setCommandIntoArgv(command);

    const errorSpy = spyOn(cli['print'], 'error');

    await cli.run();
    print.clearLastLines(1);

    expect(errorSpy).toHaveBeenCalledWith(`Command '\u001B[31m${command}\u001B[0m' does not exist. Did you mean '\u001B[33mhelloMock\u001B[0m'?`)
  });

  it('should display an error if command is not found', async () => {
    const command = 'helloMockCommand';

    setCommandIntoArgv(command);

    const errorSpy = spyOn(cli['print'], 'error');

    await cli.run();
    print.clearLastLines(1);

    expect(errorSpy).toHaveBeenCalledWith(`Command '\u001B[31m${command}\u001B[0m' not found.`);
  });
});