import md2Img from '../src'

// TODO: Implement module test
test('md2img', () => {
  expect(md2Img('w')).toBe('w@undefined')
  expect(md2Img('w', { host: 'salen.ma' })).toBe('w@salen.ma')
})
