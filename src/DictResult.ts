import {isSentence} from "./utils/SentenceHelper.ts";

export interface DictApiResponse {
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
export class FreeDictRsp implements DictApiResponse {
  constructor(rsp: Response, text: string) {
    const code = rsp.status;
    this.code = code;
    const isSuccess = code === 200;
    this.isSuccess = isSuccess;

    // asign it regardless of isSuccess.
    this.response = text;
    // console.log(this.response);
  }

  code: number;
  isSuccess: boolean;
  response: string;
  responseJSON: JSON;

  //rewrite extractPOS() and extractSentences() to extract data from this object.

  extractErrorMsg(): string {
    if (this.isSuccess) throw new Error("No error message.");

    return JSON.parse(this.response).title;
  }

  extractSentences(): string[] {
    if (!this.isSuccess) throw new Error("Can do this.");

    const { meanings } = JSON.parse(this.response)[0];

    const exmples: string[] = [];
    for (const meaning of meanings) {
      const { definitions } = meaning;
      for (const definition of definitions) {
        const { example } = definition;
        if (example && isSentence(example)) {
          exmples.push(example);
        }
      }
    }

    // If there are more than 5 examples in the list, sort them based on the length of their sentences, with longer sentences appearing first.
    // Return the first 5 examples in the sorted list.
    if(exmples.length > 5) {
      exmples.sort((a, b) => {
        return b.length - a.length;
      });
      return exmples.slice(0, 5);
    }

    return exmples;
  }

  extractPOS(): string[] {
    if (!this.isSuccess) throw new Error("Can do this.");

    const POSs = [];
    const { meanings } = JSON.parse(this.response)[0];
    for (const meaning of meanings) {
      POSs.push(meaning.partOfSpeech);
    }
    return POSs;
  }
}

// doc: https://www.free-api.com/doc/517
export class IcibaDictRsp implements DictApiResponse {
  code: number;
  isSuccess: boolean;
  response: string;

  constructor(rsp: Response, text: string) {
    const code = rsp.status;
    this.code = code;
    const isSuccess = code === 200;
    this.isSuccess = isSuccess;

    // asign it regardless of isSuccess.
    this.response = text;
    // console.log(this.response);
  }

  extractErrorMsg(): string {
    return "";
  }

  extractPOS(): string[] {
    if (!this.isSuccess) throw new Error("Can do this.");

    const POSs = [];
    const { means } = JSON.parse(this.response)["message"][0];
    for (const meaning of means) {
      POSs.push(meaning.part);
    }
    return POSs;
  }

  extractCNMeans(part: string): string[] {
    let submeans = [];
    const { means } = JSON.parse(this.response)["message"][0];
    for (const meaning of means) {
      if (meaning.part == part) submeans = meaning.means;
    }
    return submeans;
  }

  // this dict platform doesn't provide sentences.
  extractSentences(): string[] {
    return [];
  }
}

class DictApiData {
  private sentences: string[];
  // POS: part of speech. e.g. noun, verb, adjective, adverb, etc.
  private pos: string[];
  private errorMsg: string;

  private rsp: DictApiResponse;

  // param rsp: Could from Iciba and freedict
  constructor(rsp: DictApiResponse) {
    this.rsp = rsp;
    this.sentences = rsp.extractSentences();
    this.pos = rsp.extractPOS();
    this.errorMsg = rsp.extractErrorMsg();
  }
}

module.exports = {
  FreeDictRsp,
  IcibaDictRsp,
  DictApiData,
};
