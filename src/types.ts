import { WaveArguments } from "~/core/args.ts";
import { WavePrint } from "./utils/print";

export interface WaveRunOptions<Args> {
  args: WaveArguments & Args;
  print: ReturnType<typeof WavePrint>;
}

export interface WaveCommand<Args = {}> {
  name: string;
  run: (options: WaveRunOptions<Args>) => void;
  description?: string;
}
