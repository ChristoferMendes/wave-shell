import { describe, expect, it } from 'bun:test';
import { args } from '../args';

describe('args', () => {
  it('should return the command name and parsed arguments for command with flags', () => {
    process.argv = ['node', 'script.js', 'command', '--flag', 'value', '-f'];
    expect(args()).toEqual({
      commandName: 'command',
      namedArgs: {
        flag: 'value',
        f: true,
      },
      argsArray: ['--flag', 'value', '-f'],
    });
  });

  it('should return the command name and parsed arguments for another command with options', () => {
    process.argv = ['node', 'script.js', 'another-command', '--option', '123'];
    expect(args()).toEqual({
      commandName: 'another-command',
      namedArgs: {
        option: '123',
      },
      argsArray: ['--option', '123'],
    });
  });

  it('should return the command name and parsed arguments for command with no arguments', () => {
    process.argv = ['node', 'script.js', 'no-args-command'];
    expect(args()).toEqual({
      commandName: 'no-args-command',
      namedArgs: {},
      argsArray: [],
    });
  });
});