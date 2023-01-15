import { countInstances } from './countInstances'
import watchFile from './watchFile'

export default function textStatWatch() {
  if ([...process.argv].length < 4) {
    throw new Error('Must pass exactly two arguments')
  }

  let isFirstRun = true

  watchFile(process.argv[2], (text) => {
    const regexes = [...process.argv].slice(3).map(expression => new RegExp(expression))
    const instanceCounts = countInstances(regexes, text)

    if (!isFirstRun) {
      console.log('')
    } else {
      isFirstRun = false
    }
    Object.entries(instanceCounts).forEach(([regex, count]) => {
      console.log(`${regex}: ${count}`)
    })
  })
}
