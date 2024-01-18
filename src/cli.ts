import { join } from "path";
import { readdirSync, statSync, existsSync } from "fs";
import { args } from "~/core/args";
import { StringHelper } from "~/helpers/string.helper";
import { WavePrint } from "~/utils/print";
import { waveColors } from "./utils/color";
import { WaveCommand } from "~/types";
import { compileTemplate } from "surfstar";

export class Cli {
  private commands: Map<string, WaveCommand> = new Map();
  private print: ReturnType<typeof WavePrint>;

  constructor(cliName: string) {
    this.print = WavePrint(cliName);
    this._registerCommands();
  }

  private _registerCommands(directory: string = "") {
    const commandsDirectoryPath = join(
      process.cwd(),
      "src",
      "commands",
      directory
    );

    const isDirectory = existsSync(commandsDirectoryPath);

    if (!isDirectory) return this.print.error("Commands directory not found.");

    readdirSync(commandsDirectoryPath).forEach((item) => {
      const itemPath = join(commandsDirectoryPath, item);
      const isDirectory = statSync(itemPath).isDirectory();
      const hasCommandFile = existsSync(join(itemPath, `${item}-command.ts`));

      if (isDirectory && hasCommandFile) {
        this._registerCommands(join(directory, item));
        return;
      }

      const isCommandFile = item.endsWith("-command.ts");

      if (isCommandFile) {
        this._registerCommand(itemPath);
        return;
      }

      const isTypeScriptFile = item.endsWith(".ts");

      if (!isTypeScriptFile) return;

      this._registerCommand(itemPath);
    });
  }

  private _registerCommand(itemPath: string) {
    const commandModule = require(itemPath);

    const isInsideDirectory = itemPath.includes("-command");
    const directoryName = itemPath.split("/").pop()?.replace("-command.ts", "");

    if (isInsideDirectory && directoryName) {
      this.commands.set(directoryName, commandModule.default);
      return;
    }
    
    const fileName = itemPath.split("/").pop()?.replace(".ts", "");
    this.commands.set(commandModule.default.name ?? fileName, commandModule.default);
  }

  run(): this {
    const { commandName, parsedArguments } = args();
    const commandNameColor = waveColors.red(commandName);

    if (!commandName) {
      this.displayHelp();
      return this;
    }

    const command = this.commands.get(commandName);

    if (command) {
      const { message } = command.validateArgs?.(parsedArguments) ?? {}

      if (message) {
        this.print.error(message)
        return this;
      }

      command.run({
        args: parsedArguments,
        print: this.print,
        compileTemplate,
      });

   

      return this;
    }

    const suggestedCommand = this.getSuggestedCommand(commandName);

    if (suggestedCommand) {
      this.print.error(
        `Command '${commandNameColor}' does not exist. Did you mean '${suggestedCommand}'?`
      );
      return this;
    }

    if (!command) {
      this.print.error(`Command '${commandNameColor}' not found.`);
      return this;
    }

    return this;
  }

  displayHelp() {
    const listOfCommandsWithDescription = Array.from(this.commands.entries());

    const tableData = listOfCommandsWithDescription.map(([name, command]) => {
      return [waveColors.blue(name), command.description ?? ""];
    });

    this.print.spaceLine()
    this.print.table(tableData, {
      head: ["Command", "Description"],
    });
    this.print.spaceLine()
  }

  private getSuggestedCommand(query: string): string | null {
    const commandNames = Array.from(this.commands.keys());
    const matches = StringHelper.findBestMatch(query, commandNames);

    const bestMatch = matches.bestMatch;

    const startsWithBestMatch = bestMatch.target.startsWith(query);

    if (startsWithBestMatch) {
      return waveColors.yellow(bestMatch.target);
    }

    if (bestMatch.rating >= 0.5) {
      return waveColors.yellow(bestMatch.target);
    }

    return null;
  }
}
