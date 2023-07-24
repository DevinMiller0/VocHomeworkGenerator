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


// to replace the word in the sentence with blank.
export function replaceWordWithBlank(sentence:string, word:string):string{

  const FORMAL_BLANK = '___';
  if(sentence.includes(FORMAL_BLANK)) return sentence;


  // in some cases, the sentence has some words like __word__. So, I just need to remove the word leave the blank.
  const regex: RegExp = /__[a-z]+__/g;
  if(regex.test(sentence)) {
    return sentence.replace(regex, FORMAL_BLANK);
  }

  // this means the word is not in the sentence. or the word is changed into other form.
  if(!sentence.includes(word)) throw new Error('The sentence does not include the word.');
  // TODO: there need some logics to handle forms of the word like "drank, drunk, drinks".

  return sentence.replace(word, FORMAL_BLANK);
}



module.exports = { isWord, isSentence, replaceWordWithBlank };
