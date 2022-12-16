export const countInstances = (patterns: RegExp[], str: string): Record<string, number> => {
  const result: Record<string, number> = {}
  patterns.forEach(pattern => {
    result[pattern.toString()] = str.match(pattern)?.length || 0
  })

  return result
}
