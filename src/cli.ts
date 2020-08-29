import cac from 'cac'
import md2Img from '.'
const { name, version } = require('../package')

// Unified error handling
/* istanbul ignore next */
const onError = (err: Error) => {
  console.error(err.message)
  process.exit(1)
}

process.on('uncaughtException', onError)
process.on('unhandledRejection', onError)

const cli = cac(name)

// TODO: Implement module cli

cli
  .command('<input>', 'Sample cli program')
  .option('--host <host>', 'Sample options')
  .example('  $ md2img w --host salen.ma')
  .action((input: string, options: any) => {
    console.log(md2Img(input, options))
  })

cli.help().version(version).parse()
