// TODO: Implement module
export default (name: string, options?: any) => {
  if (typeof name !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof name}`)
  }

  options = Object.assign({}, options)

  return `${name}@${options.host}`
}
