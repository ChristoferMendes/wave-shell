import { existsSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { compileTemplate } from "surfstar";
import { args } from "~/core/args";
import { StringHelper } from "~/helpers/string.helper";
import { WaveCommand } from "~/types";
import { WavePrint } from "~/utils/print";
import { zodHelper } from "./helpers/zod.helper";
import { waveColors } from "./utils/color";
import { prompt } from "./utils/prompt";

export class Cli {
  private commands: Map<string, WaveCommand> = new Map();
  private print: ReturnType<typeof WavePrint>;
  private _commandExtension: string = '';
  private readonly _projectRoot: string;

  constructor(cliName: string, projectRoot: string) {
    this.print = WavePrint(cliName);
    this._projectRoot = projectRoot;
    this._defineCommandExtensionBasedOnFiles()
    this._registerCommands();
  }

  private get isDevMode () {
   return existsSync(join(this._projectRoot, 'src'))
  }

  private _defineCommandExtensionBasedOnFiles () {

    if (this.isDevMode) {
      this._commandExtension = '.ts'
      return
    }

    this._commandExtension = '.js'
  }

  private _registerCommands(directory: string = "") {
    const codeDir = this.isDevMode ? 'src' : 'dist/src'
    const commandsDirectoryPath = join(this._projectRoot, codeDir, "commands", directory);

    const isDirectory = existsSync(commandsDirectoryPath);

    if (!isDirectory) return this.print.error("Commands directory not found.");

    readdirSync(commandsDirectoryPath).forEach((item) => {
      const itemPath = join(commandsDirectoryPath, item);
      const isDirectory = statSync(itemPath).isDirectory();

      const hasCommandFile = existsSync(join(itemPath, `${item}-command${this._commandExtension}`));
      
      if (isDirectory && hasCommandFile) {
        this._registerCommands(join(directory, item));
        return;
      }

      const isCommandFile = item.endsWith(`-command${this._commandExtension}`);

      if (isCommandFile) {
        this._registerCommand(itemPath);
        return;
      }

      if (!item.endsWith(this._commandExtension)) return;

      this._registerCommand(itemPath);
    });
  }

  private _registerCommand(itemPath: string) {
    const commandModule = require(itemPath);

    const isInsideDirectory = itemPath.includes("-command");
    const directoryName = itemPath.split("/").pop()?.replace(`-command.${this._commandExtension}`, "");

    if (isInsideDirectory && directoryName) {
      this.commands.set(directoryName, commandModule.default);
      return;
    }

    const fileName = itemPath.split("/").pop()?.replace(this._commandExtension, "");
    this.commands.set(
      commandModule.default.name ?? fileName,
      commandModule.default
    );
  }

  async run(): Promise<this> {
    const { commandName, argsArray, namedArgs } = args();
    const commandNameColor = waveColors.red(commandName);

    if (!commandName) {
      this.displayHelp();
      return this;
    }

    const command = this.commands.get(commandName);

    if (command) {
      const hasValidateArgs = command.argsSchema !== undefined;

      if (!hasValidateArgs) {
        await command.run({
          args: { argsArray, namedArgs },
          print: this.print,
          compileTemplate,
          prompt,
        });

        return this;
      }

      const { argsArraySchema, namedArgsSchema } = command.argsSchema?.() ?? {};

      const argsArrayResult = argsArraySchema?.safeParse(argsArray);
      const namedArgsResult = namedArgsSchema?.safeParse(namedArgs);

      if (argsArrayResult?.success === false) {
        const errorMessage = zodHelper.formatSafeParseErrorMessage(
          argsArrayResult.error
        );

        this.print.error(errorMessage);
        return this;
      }

      if (namedArgsResult?.success === false) {
        const errorMessage = zodHelper.formatSafeParseErrorMessage(
          namedArgsResult.error
        );

        this.print.error(errorMessage);
        return this;
      }

      await command.run({
        args: { argsArray, namedArgs },
        print: this.print,
        compileTemplate,
        prompt,
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
    this.print.spaceLine();
    this.print.table(this._getHelpTableData, {
      head: ["Command", "Description"],
    });
    this.print.spaceLine();
  }

  private get _getHelpTableData() {
    return Array.from(this.commands.entries()).map(([name, command]) => {
      return [waveColors.blue(name), command.description ?? ""];
    });
  }

  private getSuggestedCommand(query: string): string | null {
    const commandNames = Array.from(this.commands.keys());
    const matches = StringHelper.findBestMatch(query, commandNames);

    const { bestMatch } = matches ?? {}

    if (!bestMatch) return null;

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
