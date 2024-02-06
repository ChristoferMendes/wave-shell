<div align="center">

  # 🌊 WAVE SHELL 🌊
</div>

![wavy(1)](https://github.com/ChristoferMendes/wave-shell/assets/107426464/2cb37816-36da-438c-95dd-419e2ecdba49)

### Requirements

- [Bun](https://bun.sh/) installed


## 🏄‍♂️ Ride the Wave of Efficiency with Wave Shell 🏄‍♀️

Welcome to Wave Shell, where every line of code is a powerful wave propelling you forward in your development journey. Just like the rhythmic and fluid nature of ocean waves, our CLI tool is designed to make your coding experience smooth, efficient, and energizing.

### Wave Shell is heavily inspired by [Gluegun](https://github.com/infinitered/gluegun)! Please go there to take a look.

### Why Wave Shell?

Wave Shell is more than just a name; it's a representation of the dynamic and seamless development experience we strive to provide. Imagine coding as effortlessly as riding the perfect wave—surfing through your projects with grace and power. Our CLI tool aims to bring that natural flow to your development process, ensuring you stay productive and energized in your daily work.

### Key Features 🚀

- **File system commands:** Every command at src/commands/ will be a new registered command for you!

- **Parsed command lines arguments:**: All arguments parsed beautifully (booleans, strings, numbers)

- **File Template**: Create files passing dynamic variables to our *.surf* files!. Powered by [Surfstar](https://github.com/ChristoferMendes/surfstar)

### Getting Started 🌊

```bash
bunx wave-shell-cli create
```

### Usage ✨
`src/commands/hello.ts`
```ts
import { WaveCommand } from "wave-shell";

export default {
  description: 'Hello world command',
  run: async ({ args, print }) => {
    const { world } = args.namedArgs; //world parsed as a boolean

    if (!world) {
      return print.error("We expected --world to say the phrase 😓")
    }

    print.success("Hello World!")
  }
} as WaveCommand

```

#### Typing this ⬇ will trigger the `run` method above ⬆ 
```shell
wave hello --world
```

## Usage with [Surfstar](https://github.com/ChristoferMendes/surfstar)

`src/templates/hello-world.surf`
```surf
Hello {{ person.name }}! I see that you are {{ years }} years old. Nice!
```

`src/commands/hello-world.ts`
```ts
import { WaveCommand } from "wave-shell";
import { join } from 'path';

function getFilePath() {
  const templateFolder = join(__dirname, '../templates');

  return join(templateFolder, 'hello-world.surf');
}

export default {
  run: async ({ compileTemplate }) => {
    const filePath = getFilePath();

    const result = await compileTemplate(filePath, {
      person: { name: 'John' },
      years: 32
    });

    Bun.write('hello.txt', result)
  }
} as WaveCommand
```
