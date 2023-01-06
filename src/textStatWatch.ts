import { readFileSync } from 'fs'
import { countInstances } from './countInstances'

export default function textStatWatch() {
  if([...process.argv].length < 4){
    throw new Error('Must pass exactly two arguments')
  }

  const text = readFileSync(process.argv[2]).toString()
  const regexes = [...process.argv].slice(3).map(expression => new RegExp(expression))
  const instanceCounts = countInstances(regexes, text)

  Object.entries(instanceCounts).forEach(([regex, count]) => {
    console.log(`${regex}: ${count}`)
  })
}
