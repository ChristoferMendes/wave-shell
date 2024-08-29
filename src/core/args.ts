import type { WaveArguments } from './types';

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

    const namedArguments = commandArgs.reduce((acc, arg, index) => {
      if (arg.startsWith('--')) {
        const nextArg = commandArgs[index + 1];
        const key = arg.slice(2);

        if (nextArg && !isBooleanFlag(nextArg)) {
          // biome-ignore lint/performance/noAccumulatingSpread: @TODO: Fix this
          return { ...acc, [key]: parseStringValue(nextArg) };
        }
   // biome-ignore lint/performance/noAccumulatingSpread: @TODO: Fix this
        return { ...acc, [key]: true };
      }

      if (arg.startsWith('-')) {
           // biome-ignore lint/performance/noAccumulatingSpread: @TODO: Fix this
        return { ...acc, [arg.slice(1)]: true };
      }

      return acc;
    }, {});

    return {
      namedArgs: namedArguments,
      argsArray: commandArgs
    };
  }

  return {
    commandName,
    ...parseArguments()
  };
}
