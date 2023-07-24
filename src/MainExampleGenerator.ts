// An entry file for generating example sentences of vocabs.
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-var-requires */
import { fetchFromFreeDict } from "./basicgenerators/freedictApi";
import { FreeDictRsp, IcibaDictRsp } from "./DictResult";
import {generateExamples, generateExamplesByCNMean} from "./basicgenerators/openaiConf";
import {replaceWordWithBlank} from "./utils/SentenceHelper.ts";

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

  // 2. use openai to generate examples with pos and cnmeans, which is from iciba data.
  const result = [];
  if(isVip) {
    const postMapCNMeanings = {};
    for (const p of pos) {
      const cnMeans = icibaData.extractCNMeans(p);

      console.log(cnMeans);
      const openaisentences:string[] = await OpenAIAPI.generateExamplesByCNMean(word, p, cnMeans)
      //push openai sentences into another array: result
      result.push(...openaisentences);
    }

  }
  else {
    const freedictData: FreeDictRsp = await FreeDictAPI.fetchFromFreeDict(word);
    const freedictSentences = freedictData.extractSentences();

    console.log(freedictSentences);
    result.push(...freedictSentences);
  }


  console.log(`generateExamplesFromMai: ${word} .`);

  // to use function "replaceWordWithBlank" to make every sentence like homework.
  for(let i = 0; i < result.length; i++) {
    result[i] = replaceWordWithBlank(result[i], word);
  }

  return result
}

module.exports = { generateExamplesFromMain };
