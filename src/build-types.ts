import dts from 'bun-plugin-dts'
import { WavePrint } from '~/utils/print'

async function build() {
  const print = WavePrint('BUILD')
  print.info('Building types...')

  await Bun.build({
    entrypoints: ['index.ts'],
    outdir: 'dist',
    plugins: [dts()]
  })

  print.success('Types built!')
}

build()