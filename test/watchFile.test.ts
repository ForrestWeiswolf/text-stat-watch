import fs from 'fs'
import watchFile from '../src/watchFile'

jest.mock('fs')
jest.spyOn(console, 'log')

describe('text-stat-watch', () => {
  let simulateFileChange = () => { }
  const readFileSyncMock = fs.readFileSync as jest.Mock
  const watchMock = fs.watch as jest.Mock

  const filePath = 'foo.txt'
  const fileText = 'foo bar baz'

  beforeEach(() => {
    readFileSyncMock.mockImplementation((path) => {
      if (path === filePath) {
        return fileText
      }
    })

    watchMock.mockImplementation((filename, callback) => {
      simulateFileChange = () => callback('change', filename)
    })
  })

  it('calls the callback on the text of the file passed as the first argument', () => {
    const callback = jest.fn()

    watchFile(filePath, callback)

    expect(callback).toBeCalledWith(fileText)
  })

  it('calls the callback on the new text of the file when te file is changed', () => {
    const callback = jest.fn()

    watchFile(filePath, callback)

    readFileSyncMock.mockImplementation((path) => '')
    simulateFileChange()

    expect(callback).toBeCalledWith('')
  })
})