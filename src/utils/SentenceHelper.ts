// there are some functions that are used to identify if a string is a whole sentence or not.

// Path: src/utils/WordHelper.ts

export function isWord(word: string): boolean {
  return /^[a-zA-Z]+$/.test(word);
}

// to identify if a string is a whole sentence or not.
// if the first char is A-Z, and the end of it is a punctuation, question mark and other things, then it is a sentence.
export function isSentence(sentence: string): boolean {
  if(sentence.length < 2) return false;
  return /^[A-Z].+[!\\.\\?\\!]$/.test(sentence);
}





module.exports = { isWord, isSentence };
