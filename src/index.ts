import fs from 'fs'
import path from 'path'
import marked from 'marked'

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

export default (input: string, options: Options = {}): void => {
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

  const contents = fs.readFileSync(filename, 'utf8')
  const html = marked(contents)

  options = Object.assign({
    output: 'output.png',
    width: 800
  }, options)
  console.log(html)
}
