import Block from "./block";
import cryptoHash from "../utils/cryto-hash";
import { block } from "../utils/Interfaces";
class Blockchain {
  chain: any[];

  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }: any) {
    const newBlock = Block.minedBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });

    this.chain.push(newBlock);
  }

  replaceChain(chain: any) {
    if (chain.length <= this.chain.length) {
      console.error("the incoming chain must be long");
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.error("the incoming chain must be valid");
      return;
    }
    console.log("replacing chian with", chain);
    this.chain = chain;
  }
  static isValidChain(chain: any) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    for (var i = 1; i < chain.length; i++) {
      const block = chain[i];
      const actualLastHash = chain[i - 1].hash;
      const actualLastDifficulty = chain[i - 1];

      const { timestamp, lastHash, hash, data, nonce, difficulty } = block;
      //check if last hash is valid
      if (lastHash !== actualLastHash) {
        return false;
      }

      if (actualLastDifficulty - difficulty > 1) return false;
      //check if data has not been tempered with
      const validatedHash = cryptoHash(
        timestamp,
        lastHash,
        data,
        nonce,
        difficulty
      );
      if (validatedHash !== hash) {
        return false;
      }
    }

    return true;
  }
}

const blockchain = new Blockchain();
// blockchain.addBlock({ data: "mends albert" });
// blockchain.addBlock({ data: "elon musk" });
// blockchain.addBlock({ data: "steve jobs" });
// blockchain.addBlock({ data: "bill gates" });
// console.log((blockchain.chain[0] = { data: "new data" }));

export default Blockchain;
