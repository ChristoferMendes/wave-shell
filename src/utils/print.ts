import CliTable3 from "cli-table3";
import { waveColors } from "~/utils/color";

export function WavePrint(context?: string) {
  function getContext() {
    return context ? `[${context}]` : '[Logger]'
  }

  function success(...message: string[]) {
    return console.log(waveColors.green(getContext()), ...message);
  }

  function error(...message: string[]) {
    return console.error(waveColors.red(getContext()), ...message);
  }

  function info(...message: string[]) {
    return console.info(getContext(), ...message);
  }

  function table(data: string[][], options:  CliTable3.TableConstructorOptions = {}): void {
    let t
    const CLI_TABLE_CHARACTERS = {
      // top: color.white('─'),
      'top-mid': '',
      // 'top-left': color.white('┌'),
      'top-right': '',
      bottom: '',
      'bottom-mid': '',
      'bottom-left': '',
      'bottom-right': '',
      left: ' ',
      // 'left-mid': color.white('├'),
      mid: '',
      'mid-mid': '',
      right: '',
      'right-mid': '',
      middle: ' ',
    }
    t = new CliTable3({
      chars: CLI_TABLE_CHARACTERS,
      ...options
    })
    t.push(...data)
    console.log(t.toString())
  }

  function spaceLine() {
    console.log()
  }

  function clearLastLines (count: number) {
    process.stdout.moveCursor(0, -count)
    process.stdout.clearScreenDown()
  }

  return {
    success,
    error,
    table,
    info,
    spaceLine,
    clearLastLines
  }
}
