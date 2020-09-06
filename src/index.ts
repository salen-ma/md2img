import fs from 'fs'
import path from 'path'
import marked from 'marked'
import puppeteer from 'puppeteer'
import ora from 'ora'
import { cosmiconfigSync } from 'cosmiconfig'
import selectLayout from './select'

export interface Options {
  /**
   * output image path
   * @default output.png
   */
  output?: string
  /**
   * output image width
   * @default 800
   */
  width?: number
}

export interface Config {
  template: string
}

const inputErrorHandle = (input: string): string | never => {
  if (typeof input !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof input}`)
  }

  const filename = path.resolve(input)
  if (!fs.existsSync(filename)) {
    throw new Error('file path not exist')
  }

  const stat = fs.statSync(filename)
  if (stat.isDirectory()) {
    throw new Error('input path is a directory not a file')
  }

  return filename
}

const compileMd2Html = async (filename: string): Promise<string> => {
  const contents = fs.readFileSync(filename, 'utf8')
  const fragment = marked(contents)
  const explorer = cosmiconfigSync('md2img')
  const configResult = explorer.search(process.cwd())
  const defaultConfigResult = explorer.search(path.resolve(__dirname, '../'))
  let config: Config = configResult?.config
  if (config == null) {
    config = defaultConfigResult?.config
    const { layout, highlight } = await selectLayout()
    return config.template.replace('{{fragment}}', fragment)
      .replace('{{layout}}', layout)
      .replace('{{highlight}}', highlight)
  }

  return config.template.replace('{{fragment}}', fragment)
}

const htmlScreenshot = async (html: string, width: number, output: string): Promise<string> => {
  const spinner = ora('Create img...').start()
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: width, height: 80 })
  await page.setContent(html)
  await page.screenshot({ path: output, fullPage: true })
  await browser.close()
  spinner.succeed('Create img complete.')
  return output
}

export default async (input: string, options: Options = {}): Promise<string> => {
  const filename = inputErrorHandle(input)

  const {
    output = 'output.png',
    width = 800
  } = options
  const html = await compileMd2Html(filename)
  return await htmlScreenshot(html, width, output)
}
