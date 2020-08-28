const md2Img = require('..')

// TODO: Implement module test
test('md2img', () => {
  expect(md2Img('w')).toBe('w@undefined')
  expect(md2Img('w', { host: 'salen.ma' })).toBe('w@salen.ma')
  expect(() => md2Img(100)).toThrow('Expected a string, got number')
})
