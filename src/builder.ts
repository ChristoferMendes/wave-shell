import dts from 'bun-plugin-dts'
import { WavePrint } from '~/utils/print'


async function build() {
  const print = WavePrint('BUILD')
  print.info('Building project with types')

  await Bun.build({
    entrypoints: ['index.ts'],
    outdir: 'dist',
    plugins: [dts()],
    target: 'bun',
  })

  print.success('Project built!')
}

build()