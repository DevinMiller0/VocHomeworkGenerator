import "mocha";
import { expect } from "chai";

import { isWord, isSentence } from '../src/utils/SentenceHelper';

describe('WordHelper', () => {
  describe('isWord', () => {
    it('should return true for a valid word', () => {
      const word = 'hello';
      const result = isWord(word);
      expect(result).true;
    });

    it('should return false for a string with non-alphabetic characters', () => {
      const word = 'hello123';
      const result = isWord(word);
      expect(result).false;
    });

    it('should return false for an empty string', () => {
      const word = '';
      const result = isWord(word);
      expect(result).false;
    });
  });

  describe('isSentence', () => {
    it('should return true for a valid sentence', () => {
      const sentence = 'This is a sentence.';
      const result = isSentence(sentence);
      expect(result).true;
    });

    it('should return false for a string that does not start with an uppercase letter', () => {
      const sentence = 'this is not a sentence.';
      const result = isSentence(sentence);
      expect(result).false;
    });

    it('should return false for a string that does not end with a punctuation mark', () => {
      const sentence = 'This is not a sentence';
      const result = isSentence(sentence);
      expect(result).false;
    });

    it('should return false for a string with less than 2 characters', () => {
      const sentence = 'A';
      const result = isSentence(sentence);
      expect(result).false;
    });
  });
});
