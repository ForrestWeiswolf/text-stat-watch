import { readFileSync } from 'fs'
import { countInstances } from './countInstances'

export default function textStatWatch() {
  if([...process.argv].length < 4){
    throw new Error('Must pass exactly two arguments')
  }

  const text = readFileSync(process.argv[2]).toString()
  const regex = new RegExp(process.argv[3])
  const instanceCounts = countInstances([regex], text)
  const count = instanceCounts[regex.toString()]

  console.log(String(count))
}
