import { WaveArguments } from "./types";


export function args() {
  const args = process.argv.slice(2);
  const commandName = args[0];

  function isBooleanFlag(arg: string): boolean {
    return arg.startsWith('-');
  }

  function parseStringValue(value: string): boolean | string {
    return isBooleanFlag(value) ? true : value;
  }

  function parseArguments(): WaveArguments {
    const commandArgs = args.slice(1);
    console.log(commandArgs)

    const reduced = commandArgs.reduce((acc, arg, index) => {
      if (arg.startsWith('--')) {
        const nextArg = commandArgs[index + 1];
        const key = arg.slice(2);

        if (nextArg && !isBooleanFlag(nextArg)) {
          return { ...acc, [key]: parseStringValue(nextArg) };
        }

        return { ...acc, [key]: true };
      }

      if (arg.startsWith('-')) {
        return { ...acc, [arg.slice(1)]: true };
      }

      return {
        ...acc,
        [arg]: arg
      }
    }, {});

    console.log(reduced)
    return reduced;
  }

  return {
    commandName,
    parsedArguments: parseArguments()
  };
}
