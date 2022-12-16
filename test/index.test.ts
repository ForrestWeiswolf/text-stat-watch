import { countInstances } from '../src'

describe('countInstances', () => {
  it('returns an empty object when passed an empty array', () => {
    expect(countInstances([], 'foo bar baz')).toEqual({})
  })

  describe('when passed an array with several patterns', () => {
    it('when passed an empty string, returns the patterns as keys with values of 0', () => {
      const patterns = [/a/, /\d+/, /\t/]

      expect(countInstances(patterns, '')).toEqual({
        '/a/': 0, '/\\d+/': 0, '/\\t/': 0
      })
    })

    it('when passed a string that matches the patterns, returns the number of matches as values', () => {
      const patterns = [/a/g, /\d+/g, /\t/g]

      expect(countInstances(patterns, 'aa12 aaa')).toEqual({
        '/a/g': 5, '/\\d+/g': 1, '/\\t/g': 0
      })
    })
  })
})