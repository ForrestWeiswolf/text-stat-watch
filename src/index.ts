import { readFileSync } from 'fs'

export default function textStatWatch() {
  readFileSync(process.argv[2])
}

textStatWatch()