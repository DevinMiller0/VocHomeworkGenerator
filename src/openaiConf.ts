//This uses the openai library to generate examples of a given word. The code requires an OpenAI API key to work, which is expected to be stored in the environment variable OPENAI_API_KEY.

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


//The function is defined as an asynchronous function, which means it returns a promise that will resolve with the generated examples. If an error occurs during the execution of the function, the catch block will log the error message to console.

export async function generateExamples(word) {

  if (!process.env.OPENAI_API_KEY){
    console.log("Please set OPENAI_API_KEY in environment variable.");
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `I am learning word: ${word}. Please generate examples that according to the word. 
      For the count of examples, if it has 2 type of meanings like verb and noun, you can just generate 2 examples for those types of POS.
      And replace the word in example sentence with blank. So this sentence like a homework question.
      `,
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

module.exports = { generateExamples };
