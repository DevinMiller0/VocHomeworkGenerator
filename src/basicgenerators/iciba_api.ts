import { IcibaDictRsp } from "../DictResult";

// eslint-disable-next-line @typescript-eslint/no-var-requires

const ICIBA_API_PREFIX =
  "https://dict-mobile.iciba.com/interface/index.php?c=word&m=getsuggest&nums=10&is_need_mean=1&word=";

export async function fetchFromIciba(word): Promise<IcibaDictRsp> {
  const url = ICIBA_API_PREFIX + word;
  const rsp = await fetch(url);
  return new IcibaDictRsp(rsp, await rsp.text());
}

module.exports = { fetchFromIciba };
