//This uses the openai library to generate examples of a given word. The code requires an OpenAI API key to work, which is expected to be stored in the environment variable OPENAI_API_KEY.
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { Configuration, OpenAIApi } = require("openai");

const DEFAULT_MODEL = "text-davinci-003";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//The function is defined as an asynchronous function, which means it returns a promise that will resolve with the generated examples. If an error occurs during the execution of the function, the catch block will log the error message to console.
// 函数实现，参数单位 毫秒 ；
async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export async function generateExamples(word, pos) {
  if (!process.env.OPENAI_API_KEY) {
    console.error("Please set OPENAI_API_KEY in environment variable.");
    throw new Error("Please set OPENAI_API_KEY in environment variable.");
  }
  await wait(7000);

  try {
    const completion = await openai.createCompletion({
      model: DEFAULT_MODEL,
      prompt:  pos ? `I am learning word: ${word}.  Please generate examples that according to the word. 
      For the count of examples, if it has 2 type of meanings like verb and noun, you can just generate 2 examples for those types of POS(verb,noun and adj .etc).
      And replace the word in example sentence with blank. So this sentence like a homework question.`
      : `I am learning word: ${word} as ${pos}.  Please generate an example for the word.`,
    });
    console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }

}



export async function generateExamplesByCNMean(word, pos, cnmeans) {
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

  await wait(20000); // due to free openai account
  try {
    const completion = await openai.createCompletion({
      model: DEFAULT_MODEL,
      prompt: `${firstLine}
      Also, remember to replace the words in the example phrases with blanks. So those sentences appear to be homework questions. And the sentences must be separated by new line char.
      `,
    });
    console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response.data.code || error.response.data.message  || 'openai: unknown error';
    } else {
      console.log(error.message);
    }
  }
}


module.exports = { generateExamples,generateExamplesByCNMean };
