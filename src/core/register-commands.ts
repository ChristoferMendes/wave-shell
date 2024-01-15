import { join } from 'path';
import { readdirSync, statSync } from 'fs';
import { Cli } from "~/cli.ts";
import { WaveCommand } from "~/types.ts";

export function registerCommands(cli: Cli, directory: string = '') {
  const commandsDirectoryPath = join(process.cwd(), 'src', 'commands', directory);

  readdirSync(commandsDirectoryPath).forEach(item => {
    const itemPath = join(commandsDirectoryPath, item);
    const isDirectory = statSync(itemPath).isDirectory();

    if (isDirectory) {
      registerCommands(cli, join(directory, item));
      return;
    }

    const isCommandFile = item.endsWith('-command.ts');

    if (isCommandFile) {
      register(itemPath);
      return;
    }

    const isTypeScriptFile = item.endsWith('.ts');

    if (!isTypeScriptFile) return;

    register(itemPath);
  });

  function register(itemPath: string) {
    const commandModule = require(itemPath);
    cli.registerCommand(commandModule.default as WaveCommand);
  }
}
