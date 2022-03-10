import Block from "./block";
import cryptoHash from "../utils/cryto-hash";
import { MINED_REWARD, REWARD_INPUT } from "../config";
import Transaction from "../wallet/Transactions";
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

  validateTransactionData(chain: any) {
    for (var i = 0; i < chain.length; i++) {
      const block = chain[i];
      let rewardTransactionCount = 0;
      for (let transaction of block.data) {
        if (transaction.input.address === REWARD_INPUT.address) {
          if (rewardTransactionCount > 1) {
            return false;
          }

          if (Object.values(transaction.outputTotal)[0] !== MINED_REWARD) {
            return false;
          }
        } else {
          if (!Transaction.validateTransaction(transaction)) {
            return false;
          }
        }
      }
    }

    return true;
  }
  replaceChain(chain: any, onSuccess: any = "") {
    if (chain.length <= this.chain.length) {
      console.error("the incoming chain must be long");
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.error("the incoming chain must be valid");
      return;
    }
    if (onSuccess) {
      onSuccess();
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

export default Blockchain;
