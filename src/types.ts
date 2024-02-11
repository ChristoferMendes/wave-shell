import { compileTemplate } from "surfstar";
import { z } from "zod";
import { WaveArguments } from "./core/types";
import { WavePrint } from "./utils/print";
import { prompt } from "./utils/prompt";

export interface WaveCommand<Args = {}> {
  argsSchema?: () => {
    argsArraySchema?: z.ZodArray<any, any>;
    namedArgsSchema?: z.ZodObject<any, any, any>;
  };
  run: (options: WaveRunOptions<Args>) => Promise<void>;
  description?: string;
}


export interface WaveRunOptions<ArgsT = {}> {
  args: {
    argsArray: string[];
    namedArgs: WaveArguments['namedArgs'] & ArgsT;
  };
  print: ReturnType<typeof WavePrint>;
  prompt: typeof prompt;
  compileTemplate: typeof compileTemplate;
}

export type WavePrompt = typeof prompt;

export * from "~/core/types";
export * from "~/utils/types";

