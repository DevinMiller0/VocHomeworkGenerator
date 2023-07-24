import "mocha";
import { expect } from "chai";

import { isWord, isSentence, replaceWordWithBlank } from '../src/utils/SentenceHelper';

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



  describe('replaceWordWithBlank', () => {
    it('should replace the word in the sentence with blank', () => {
      const sentence = 'I ate an apple.';
      const word = 'ate';
      const expected = 'I ___ an apple.';
      const result = replaceWordWithBlank(sentence, word);
      expect(result).equals(expected);
    });

    it('should return the same sentence if it already contains a blank', () => {
      const sentence = 'I ___ an apple.';
      const word = 'ate';
      const result = replaceWordWithBlank(sentence, word);
      expect(result).equals(sentence);
    });


    it('should return a new sentence if it already contains a blank', () => {
      const sentence = 'I __ate__ an apple.';
      const word = 'ate';
      const result = replaceWordWithBlank(sentence, word);

      const expected = 'I ___ an apple.';
      expect(result).equals(expected);
    });

    it('should throw an error if the sentence does not include the word', () => {
      const sentence = 'I ate an apple.';
      const word = 'banana';
      expect(() => {
        replaceWordWithBlank(sentence, word);
      }).throws('The sentence does not include the word.');
    });

  });


});
