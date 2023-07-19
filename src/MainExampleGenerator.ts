// An entry file for generating example sentences of vocabs.
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-var-requires */
import { fetchFromFreeDict } from "./basicgenerators/freedictApi";
import { FreeDictRsp, IcibaDictRsp } from "./DictResult";
import {generateExamples, generateExamplesByCNMean} from "./basicgenerators/openaiConf";

const FreeDictAPI = require("./basicgenerators/freedictApi.ts");
const OpenAIAPI = require("./basicgenerators/openaiConf.ts");
const IcibaAPI = require("./basicgenerators/iciba_api.ts");

export async function generateExamplesFromMain(word:string, isVip: boolean) {
  console.log("generateExamplesFromMai:" + word);
  // 1. iciba dict data
  const icibaData: IcibaDictRsp = await IcibaAPI.fetchFromIciba(word);
  // console.log(icibaData.extractSentences());
  console.log(icibaData.extractPOS());

  const pos = icibaData.extractPOS();

  const result = [];
  if(isVip) {
    const postMapCNMeanings = {};
    for (const p of pos) {
      const cnMeans = icibaData.extractCNMeans(p);

      console.log(cnMeans);
      result.push(await OpenAIAPI.generateExamplesByCNMean(word, p, cnMeans));
    }

  }

  // 2. free dict data
  // const freeDictData: FreeDictRsp  = await FreeDictAPI.fetchFromFreeDict(word);

  console.log(`generateExamplesFromMai: ${word} .`);

  //
  // console.log(freeDictData.extractSentences());
  // console.log(freeDictData.extractPOS());

  //3. to fill with openai data.

  return result
}

module.exports = { generateExamplesFromMain };
