function WaveColors() {
  const cliColors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    bold: "\x1b[1m",
    reset: "\x1b[0m"
  }

  function red(text: string) {
    return `${cliColors.red}${text}${cliColors.reset}`;
  }

  function green(text: string) {
    return `${cliColors.green}${text}${cliColors.reset}`;
  }

  function yellow(text: string) {
    return `${cliColors.yellow}${text}${cliColors.reset}`;
  }

  function blue(text: string) {
    return `${cliColors.blue}${text}${cliColors.reset}`;
  }

  function magenta(text: string) {
    return `${cliColors.magenta}${text}${cliColors.reset}`;
  }

  function cyan(text: string) {
    return `${cliColors.cyan}${text}${cliColors.reset}`;
  }

  function bold(text: string) {
    return `${cliColors.bold}${text}${cliColors.reset}`;
  }

  function white(text: string) {
    return `${cliColors.bold}${text}${cliColors.reset}`;
  }

  return {
    red,
    green,
    yellow,
    blue,
    magenta,
    cyan,
    bold,
    white
  }
}

export const waveColors = WaveColors();
