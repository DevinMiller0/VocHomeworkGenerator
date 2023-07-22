//This uses the openai library to generate examples of a given word. The code requires an OpenAI API key to work, which is expected to be stored in the environment variable OPENAI_API_KEY.
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { Configuration, OpenAIApi } = require("openai");
import ChatGPT from './openai_stream.ts';
const DEFAULT_MODEL = "text-davinci-003";

//The function is defined as an asynchronous function, which means it returns a promise that will resolve with the generated examples. If an error occurs during the execution of the function, the catch block will log the error message to console.
// 函数实现，参数单位 毫秒 ；
async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



let lastime = new Date().getTime();
function onRequestBegin(){
  lastime = new Date().getTime();
}

// due to limitation of 3 RPM for openai free account, we need to wait 20s for each request.
async function onRequestEnd(){
  const now = new Date().getTime();
  const diff = now - lastime;
  if(diff < 5000) {
    await wait(20000 - diff);
  }
}

export async function generateExamples(word, pos) {
  if (!process.env.OPENAI_API_KEY) {
    console.error("Please set OPENAI_API_KEY in environment variable.");
    throw new Error("Please set OPENAI_API_KEY in environment variable.");
  }
  onRequestBegin();

  const prompt= pos ? `I am learning word: ${word}.  Please generate examples that according to the word. 
      For the count of examples, if it has 2 type of meanings like verb and noun, you can just generate 2 examples for those types of POS(verb,noun and adj .etc).
      And replace the word in example sentence with blank. So this sentence like a homework question.`
    : `I am learning word: ${word} as ${pos}.  Please generate an example for the word.`;
  try {


    const completion = await ChatGPT.createSimpleCompletion(prompt);

    await onRequestEnd();
    return completion;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    await onRequestEnd();
    return [error.response.data.message  || 'openai: unknown error'];
  }

}



export async function generateExamplesByCNMean(word, pos, cnmeans):Promise<string[]> {
  if(!word || !pos || !cnmeans) {
    console.error("Please set word, pos and cnmeans.");
    throw new Error("Please set word, pos and cnmeans.");
  }

  const firstLine = `I am a Chinese  and learning the word: ${word} as type : "${pos}". I need some examples by Chinese meanings : [${cnmeans}].  Please generate several English sentences for all of the Chinese meanings.`;

  console.log(firstLine);

  if (!process.env.OPENAI_API_KEY) {
    console.error("Please set OPENAI_API_KEY in environment variable.");
    throw new Error("Please set OPENAI_API_KEY in environment variable.");
  }
  onRequestBegin()

  try {
    const prompt = `${firstLine}
      Also, remember to replace the words in the example phrases with blanks. So those sentences appear to be homework questions. And the sentences must be separated by new line char.
      `;

    const completion = await ChatGPT.createSimpleCompletion(prompt);
    console.log(`completion: ${completion}`);

    await onRequestEnd();
    return completion.split('\n');
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    await onRequestEnd();

    return [error.response?.data?.message  || 'openai: unknown error'];
  }

}


module.exports = { generateExamples,generateExamplesByCNMean };
