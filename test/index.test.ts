import { countInstances } from '../src'

describe('countInstances', () => {
  it('returns an empty object when passed an empty array', () => {
    expect(countInstances([], 'foo bar baz')).toEqual({})
  })

  describe('when passed an array with several patterns', () => {
    const patterns = [/a/, /\d+/, /\t/]
    it('when passed an empty string, returns the patterns as keys with values of 0', () => {
      expect(countInstances(patterns, '')).toEqual({
        '/a/': 0, '/\\d+/': 0, '/\\t/': 0
      })
    })
  })
})