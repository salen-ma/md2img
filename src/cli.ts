import cac from 'cac'
import md2Img from '.'
import { name, version } from '../package.json'

// Unified error handling
/* istanbul ignore next */
const onError = (err: Error): void => {
  console.error(err.message)
  process.exit(1)
}

process.on('uncaughtException', onError)
process.on('unhandledRejection', onError)

const cli = cac(name)

// TODO: Implement module cli

cli
  .command('<input>', '.md file path')
  .option('-o, --output <output>', 'output image path')
  .option('-w, --width <width>', 'output image width')
  .example('$ md2img test.md --output output.png --width 800')
  .action(md2Img)

cli.help().version(version).parse()
