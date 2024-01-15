import { registerCommands } from "~/core/register-commands.ts";
import { Cli } from "~/cli.ts";

function main() {
  const cli = new Cli('CLI');

  registerCommands(cli)

  cli.run()
}

main()
