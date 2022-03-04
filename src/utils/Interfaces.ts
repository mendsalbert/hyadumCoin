//Block class interfaces

export interface MinedBlock {
  lastBlock: {
    timestamp: Date;
    lastHash: String;
    hash: String;
    data: any;
    nonce: number;
    difficulty: number;
  };
  data: any;
}

export interface block {
  timestamp: Date;
  lastHash: String;
  hash: String;
  data: any;
  nonce: number;
  difficulty: number;
}

export interface Blockchain_ {
  chain: any[];
  addBlock({ data }: any): void;
  replaceChain(chain: any): any;
  isValidChain(chain: any): boolean;
}

export interface VerifySignature {
  publicKey: string;
  data: string;
  signature: string;
}
