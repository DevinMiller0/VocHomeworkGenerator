const FREEDICT_API_PREFIX = "https://api.dictionaryapi.dev/api/v2/entries/en/"


// eslint-disable-next-line @typescript-eslint/no-var-requires
const { FreeDictRsp } = require("../DictResult");

async function fetchFromFreeDict(word):Promise<FreeDictRsp> {
  const url = FREEDICT_API_PREFIX + word;
  const rsp = await fetch(url);
  return FreeDictRsp(rsp);
}



module.exports = { fetchFromFreeDict }
