let mockedInit: jest.SpyInstance

const mockArgv = (args: string[]): () => void => {
  const original = process.argv
  process.argv = [original[0], require.resolve('../bin/md2img'), ...args]
  return () => {
    process.argv = original
  }
}

beforeEach(async () => {
  jest.resetModules()
  mockedInit = jest.fn().mockImplementation()
  jest.mock('../src', () => ({
    __esModule: true,
    default: mockedInit
  }))
})

afterAll(async () => {
  jest.clearAllMocks()
})

test('unit:cli:init', async () => {
  const restore = mockArgv(['test.md', '--output', 'output.png', '--width', '800'])
  await import('../src/cli')
  expect(mockedInit).toHaveBeenCalled()
  expect(mockedInit.mock.calls[0][0]).toBe('test.md')
  expect(mockedInit.mock.calls[0][1]).toEqual({
    '--': [],
    output: 'output.png',
    width: 800,
    o: 'output.png',
    w: 800
  })
  restore()
})

test('unit:cli:help', async () => {
  const restore = mockArgv(['--help'])
  const log = jest.spyOn(console, 'log').mockImplementation()
  await import('../src/cli')
  expect(log).toHaveBeenCalledTimes(1)
  expect(log.mock.calls[0][0]).toContain('$ md2img <input>')
  restore()
})
