export const countInstances = (patterns: RegExp[], str: string): Record<string, number> => {
  const result: Record<string, number> = {}
  patterns.forEach(pattern => {
    const matches = str.match(new RegExp(pattern, 'g'))
    result[pattern.toString()] = matches?.length || 0
  })

  return result
}
