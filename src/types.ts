import { WaveArguments } from "./core/types";
import { WavePrint } from "./utils/print";
import { compileTemplate } from 'surfstar'


export interface WaveRunOptions<Args> {
  args: WaveArguments & Args;
  print: ReturnType<typeof WavePrint>;
  compileTemplate: typeof compileTemplate;
}

export type ValidateErrorMessage = {
  message: string;
}

export interface WaveCommand<Args = {}> {
  run: (options: WaveRunOptions<Args>) => Promise<void>;
  description?: string;
  validateArgs?: (args: WaveArguments & Args) => ValidateErrorMessage;
}

export * from '~/utils/types'
export * from '~/core/types'