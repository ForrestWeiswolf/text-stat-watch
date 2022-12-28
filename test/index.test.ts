import fs from 'fs'

jest.mock('fs')

describe('text-stat-watch', () => {
  beforeEach(() =>  {
    process.argv = 'node index.js foo.txt /\W+/'.split(' ')
    import('../src/index')
  })

  it('reads the file passed as the first argument', () => {
    expect(fs.readFileSync).toBeCalledWith('foo.txt')
  })
})