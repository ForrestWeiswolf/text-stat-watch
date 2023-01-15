import { readFileSync, watch } from 'fs'

const callOnFile = (filePath: string, callback: (text: string) => void) => {
  const text = readFileSync(filePath).toString()
  callback(text)
}

const watchFile = (filePath: string, callback: (text: string) => void) => {
  callOnFile(filePath, callback)
  watch(filePath, (eventType) => {
    callOnFile(filePath, callback)
  })
}

export default watchFile