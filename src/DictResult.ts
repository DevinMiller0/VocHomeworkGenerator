
interface DictApiResponse {
  response: string;
  code: number;
  isSuccess: boolean;

  // functions below are not implemented yet.
  extractPOS(): string[];
  extractSentences(): string[];
  extractErrorMsg(): string;
}

// Doc: "https://api.dictionaryapi.dev/api/v2/entries/en/"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class FreeDictRsp implements DictApiResponse {


  //rewrite extractPOS() and extractSentences() to extract data from this object.
  extractPOS(): string[]{
    return [];
  }

  code: number;
  isSuccess: boolean;
  response: string;

  extractErrorMsg(): string {
    return "";
  }

  extractSentences(): string[] {
    return [];
  }
}

// doc: https://www.free-api.com/doc/517
class IcibaDictRsp implements DictApiResponse {
  code: number;
  isSuccess: boolean;
  response: string;

  extractErrorMsg(): string {
    return "";
  }

  extractPOS(): string[] {
    return [];
  }

  extractSentences(): string[] {
    return [];
  }

}




class DictApiData {
  private sentences: string[];
  // POS: part of speech. e.g. noun, verb, adjective, adverb, etc.
  private pos: string[];
  private errorMsg: string;


  // param rsp: Could from Iciba and freedict
  constructor(rsp: DictApiResponse) {
    //TODO
  }

}
