// An entry file for generating example sentences of vocabs.
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-var-requires */
const FreeDictAPI = require("./basicgenerators/freedictApi.ts");


async function generateExamples(word) {

  // 1. free dict data
  const freeDictData  = await FreeDictAPI.fetchJSON(word);

  //2. to fill iciba data
  const freeDictData  = await FreeDictAPI.fetchJSON(word);

  //3. to fill with openai data.


  return null;
}












module.exports = { }
