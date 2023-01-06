import fs from 'fs'
import textStatWatch from '../src/index'

jest.mock('fs')
jest.spyOn(process.stdout, 'write')

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

  it('outputs the number of matches of the regex passed as the second argument', () => {
    process.argv = 'node index.js foo.txt f'.split(' ')
    textStatWatch()

    expect(process.stdout.write).toBeCalledWith("1")
  })

  it('outputs the number of matches of a more complicated regex passed as the second argument', () => {
    process.argv = 'node index.js foo.txt b\\w+'.split(' ')
    textStatWatch()

    expect(process.stdout.write).toBeCalledWith("2")
  })
})