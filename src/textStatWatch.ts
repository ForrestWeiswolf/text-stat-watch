import { countInstances } from './countInstances'
import watchFile from './watchFile'

const printTextStats = (regexes: RegExp[], text: string) => {
  const instanceCounts = countInstances(regexes, text)

  Object.entries(instanceCounts).forEach(([regex, count]) => {
    console.log(`${regex}: ${count}`)
  })
}

export default function textStatWatch() {
  if ([...process.argv].length < 4) {
    throw new Error('Must pass exactly two arguments')
  }

  let isFirstRun = true
  const regexes = [...process.argv].slice(3).map(expression => new RegExp(expression))

  watchFile(process.argv[2], (text) => {
    if (!isFirstRun) {
      console.log('')
    } else {
      isFirstRun = false
    }

    printTextStats(regexes, text)
  })
}
