import { readFileSync } from 'fs'
import { countInstances } from '../src/countInstances'

export default function textStatWatch() {
  const text = readFileSync(process.argv[2])?.toString()
  const regex = new RegExp(process.argv[3])
  const instanceCounts = countInstances([regex], text || '')
  const count = instanceCounts[regex.toString()]

  process.stdout.write(String(count))
}

textStatWatch()
