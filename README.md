<div align="center">

  # 🌊 WAVE SHELL 🌊
</div>

## 🏄‍♂️ Ride the Wave of Efficiency with Wave Shell 🏄‍♀️

Welcome to Wave Shell, where every line of code is a powerful wave propelling you forward in your development journey. Just like the rhythmic and fluid nature of ocean waves, our CLI tool is designed to make your coding experience smooth, efficient, and energizing.

### Why Wave Shell?

Wave Shell is more than just a name; it's a representation of the dynamic and seamless development experience we strive to provide. Imagine coding as effortlessly as riding the perfect wave—surfing through your projects with grace and power. Our CLI tool aims to bring that natural flow to your development process, ensuring you stay productive and energized in your daily work.

### Key Features 🚀

- **File system commands:** Every command at src/commands/ will be a new registered command for you!

- **Parsed command lines arguments:**: All arguments parsed beautifully (booleans, strings, numbers)

- **File Template**: Create files passing dynamic variables to our *.surf* files!. Powered by [Surfstar](https://github.com/ChristoferMendes/surfstar)

### Getting Started 🌊

```bash
bunx wave-cli create wave
```

### Usage ✨
`src/commands/hello.ts`
```ts
import { WavePrint, WaveCommand } from "wave-shell";

export default {
  description: 'Hello world command',
  run: ({ args, print }) => {
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