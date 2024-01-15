import { WaveArguments } from "~/core/args.ts";

export interface WaveRunOptions<Args> {
  args: WaveArguments & Args;
}

export interface WaveCommand<Args = {}> {
  name: string;
  run: (options: WaveRunOptions<Args>) => void;
  description?: string;
}
