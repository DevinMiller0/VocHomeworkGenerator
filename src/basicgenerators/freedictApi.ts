import { FreeDictRsp } from "../DictResult";

const FREEDICT_API_PREFIX = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// eslint-disable-next-line @typescript-eslint/no-var-requires

export async function fetchFromFreeDict(word): Promise<FreeDictRsp> {
  const url = FREEDICT_API_PREFIX + word;
  const rsp = await fetch(url);
  return new FreeDictRsp(rsp, await rsp.text());
}

module.exports = { fetchFromFreeDict };
