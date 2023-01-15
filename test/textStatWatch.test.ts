import fs from 'fs'
import textStatWatch from '../src/textStatWatch'

jest.mock('fs')
jest.spyOn(console, 'log')

describe('text-stat-watch', () => {
  let simulateFileChange = () => { }
  const readFileSyncMock = fs.readFileSync as jest.Mock
  const watchMock = fs.watch as jest.Mock
  const consoleLogMock = console.log as jest.Mock

  beforeEach(() => {
    readFileSyncMock.mockReturnValue('foo bar baz')

    watchMock.mockImplementation((filename, callback) => {
      simulateFileChange = () => callback('change', filename)
    })

    consoleLogMock.mockReset()
  })

  it('reads the file passed as the first argument', () => {
    process.argv = 'node index.js foo.txt \w+'.split(' ')
    textStatWatch()

    expect(fs.readFileSync).toBeCalledWith('foo.txt')
  })

  it('outputs the number of matches of the regex passed as the second command line argument', () => {
    process.argv = 'node index.js foo.txt f'.split(' ')
    textStatWatch()

    expect(console.log).toBeCalledWith("/f/: 1")
  })

  it('outputs the number of matches of a more complicated regex passed as the second command line argument', () => {
    process.argv = 'node index.js foo.txt b\\w+'.split(' ')
    textStatWatch()

    expect(console.log).toBeCalledWith("/b\\w+/: 2")
  })

  it('outputs the number of matches of multiple regexes passed as command line arguments', () => {
    process.argv = 'node index.js foo.txt f b\\w+'.split(' ')
    textStatWatch()

    expect(console.log).toBeCalledWith("/b\\w+/: 2")
    expect(console.log).toBeCalledWith("/f/: 1")
  })

  describe('when the file is changed', () => {
    it('prints updated results after a separator', () => {
      process.argv = 'node index.js foo.txt f'.split(' ')
      textStatWatch()

      expect(console.log).toBeCalledWith("/f/: 1")

      readFileSyncMock.mockReturnValue('foo foo')
      simulateFileChange()

      expect(console.log).toBeCalledWith('')
      expect(console.log).toBeCalledWith('/f/: 2')

    })
  })

  describe('validation', () => {
    it('throws an error if there are less than two command line arguments', () => {
      process.argv = 'node index.js foo.txt'.split(' ')

      expect(textStatWatch).toThrow('Must pass exactly two arguments')
    })
  })
})