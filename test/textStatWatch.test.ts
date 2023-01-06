import fs from 'fs'
import textStatWatch from '../src/textStatWatch'

jest.mock('fs')
jest.spyOn(console, 'log')

describe('text-stat-watch', () => {
  beforeEach(() => {
    const readFileSyncMock = fs.readFileSync as jest.Mock
    readFileSyncMock.mockReturnValue('foo bar baz')
  })

  it('reads the file passed as the first argument', () => {
    process.argv = 'node index.js foo.txt \w+'.split(' ')
    textStatWatch()

    expect(fs.readFileSync).toBeCalledWith('foo.txt')
  })

  it('outputs the number of matches of the regex passed as the second command line argument', () => {
    process.argv = 'node index.js foo.txt f'.split(' ')
    textStatWatch()

    expect(console.log).toBeCalledWith("1")
  })

  it('outputs the number of matches of a more complicated regex passed as the second command line argument', () => {
    process.argv = 'node index.js foo.txt b\\w+'.split(' ')
    textStatWatch()

    expect(console.log).toBeCalledWith("2")
  })

  describe('validation', () => {
    it('throws an error if there are less than two command line arguments', () => {
      process.argv = 'node index.js foo.txt'.split(' ')

      expect(textStatWatch).toThrow('Must pass exactly two arguments')
    })
  })
})