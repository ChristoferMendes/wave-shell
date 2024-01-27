import { describe, expect, it } from 'bun:test';
import { StringHelper } from '../string.helper';

describe('StringHelper', () => {
  describe('findBestMatch', () => {
    it('should return the best match and ratings for a given main string and target strings', () => {
      const mainString = 'hello';
      const targetStrings = ['hello', 'world', 'help', 'hell'];

      const result = StringHelper.findBestMatch(mainString, targetStrings);

      expect(result.ratings).toEqual([
        { target: 'hello', rating: 1 },
        { target: 'world', rating: 0 },
        { target: 'help', rating: 0.5714285714285714 },
        { target: 'hell', rating: 0.8571428571428571 },
      ]);
      expect(result.bestMatch).toEqual({ target: 'hello', rating: 1 });
      expect(result.bestMatchIndex).toBe(0);
    });
  });

  describe('compareTwoStrings', () => {
    it('should return the similarity rating between two strings', () => {
      const first = 'hello';
      const second = 'help';

      const result = StringHelper.compareTwoStrings(first, second);

      expect(result).toBe(0.5714285714285714);
    });

    it('should return 1 if the two strings are identical', () => {
      const first = 'hello';
      const second = 'hello';

      const result = StringHelper.compareTwoStrings(first, second);

      expect(result).toBe(1);
    });

    it('should return 0 if either of the strings has a length less than 2', () => {
      const first = 'h';
      const second = 'help';

      const result1 = StringHelper.compareTwoStrings(first, second);
      const result2 = StringHelper.compareTwoStrings(second, first);

      expect(result1).toBe(0);
      expect(result2).toBe(0);
    });
  });
});