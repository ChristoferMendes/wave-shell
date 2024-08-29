import type { compileTemplate } from 'surfstar';
import type { z } from 'zod';
import type { WaveArguments } from './core/types';
import type { WavePrint } from './utils/print';
import type { prompt } from './utils/prompt';

// biome-ignore lint/suspicious/noExplicitAny: @TODO: add better types
export interface WaveCommand<Args = Record<string, any>> {
  argsSchema?: () => {
    // biome-ignore lint/suspicious/noExplicitAny: @TODO: add better types
    argsArraySchema?: z.ZodArray<any, any>;
    // biome-ignore lint/suspicious/noExplicitAny: @TODO: add better types
    namedArgsSchema?: z.ZodObject<any, any, any>;
  };
  run: (options: WaveRunOptions<Args>) => Promise<void>;
  description?: string;
}

// biome-ignore lint/suspicious/noExplicitAny: @TODO: add better types
export interface WaveRunOptions<ArgsT = Record<string, any>> {
  args: {
    argsArray: string[];
    namedArgs: WaveArguments['namedArgs'] & ArgsT;
  };
  print: ReturnType<typeof WavePrint>;
  prompt: typeof prompt;
  compileTemplate: typeof compileTemplate;
}

export type WavePrompt = typeof prompt;

export * from '~/core/types';
export * from '~/utils/types';
