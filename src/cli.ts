import { args } from "~/core/args.ts";
import { StringHelper } from "~/helpers/string.helper.ts";
import { WavePrint } from "~/utils/print.ts";
import { waveColors } from "./utils/color.ts";
import { WaveCommand } from "~/types.ts";


export class Cli {
  private commands: Map<string, WaveCommand> = new Map();
  private print: ReturnType<typeof WavePrint>;


  constructor(cliName: string) {
    this.print = WavePrint(cliName);
  }

  registerCommand(command: WaveCommand) {
    this.commands.set(command.name, command);
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
      command.run({
        args: parsedArguments
      });

      return this;
    }

    const suggestedCommand = this.getSuggestedCommand(commandName);

    if (suggestedCommand) {
      this.print.error(`Command '${commandNameColor}' does not exist. Did you mean '${suggestedCommand}'?`);
      return this;
    }


    if (!command) {
      this.print.error(`Command '${commandNameColor}' not found.`);
      return this;
    }

    return this;
  }

  displayHelp() {
    const listOfCommandsWithDescription = Array.from(this.commands.entries())

    const tableData = listOfCommandsWithDescription.map(([name, command]) => {
      return [waveColors.blue(name), command.description ?? '']
    })
    
    this.print.table(tableData, {
      head: ['Command', 'Description']
    })
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
