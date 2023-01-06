import fs from 'fs'
import textStatWatch from '../src/index'

jest.mock('fs')

describe('text-stat-watch', () => {
  beforeEach(() =>  {
    process.argv = 'node index.js foo.txt /\W+/'.split(' ')
    textStatWatch()
  })

  it('reads the file passed as the first argument', () => {
    expect(fs.readFileSync).toBeCalledWith('foo.txt')
  })
})