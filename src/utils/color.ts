function WaveColors() {
  const cliColors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    bold: "\x1b[1m",
    white: "\x1b[37m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m",
    gray: "\x1b[90m",


    reset: "\x1b[0m"
  };

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
    return `${cliColors.white}${text}${cliColors.reset}`;
  }
  
  function gray(text: string) {
    return `${cliColors.gray}${text}${cliColors.reset}`;
  }

  // Background color functions
  function bgRed(text: string) {
    return `${cliColors.bgRed}${text}${cliColors.reset}`;
  }

  function bgGreen(text: string) {
    return `${cliColors.bgGreen}${text}${cliColors.reset}`;
  }

  function bgYellow(text: string) {
    return `${cliColors.bgYellow}${text}${cliColors.reset}`;
  }

  function bgBlue(text: string) {
    return `${cliColors.bgBlue}${text}${cliColors.reset}`;
  }

  function bgMagenta(text: string) {
    return `${cliColors.bgMagenta}${text}${cliColors.reset}`;
  }

  function bgCyan(text: string) {
    return `${cliColors.bgCyan}${text}${cliColors.reset}`;
  }

  function bgWhite(text: string) {
    return `${cliColors.bgWhite}${text}${cliColors.reset}`;
  }

  return {
    red,
    green,
    yellow,
    blue,
    magenta,
    cyan,
    bold,
    white,
    bgRed,
    bgGreen,
    bgYellow,
    bgBlue,
    bgMagenta,
    bgCyan,
    bgWhite,
    gray
  };
}

export const waveColors = WaveColors();
