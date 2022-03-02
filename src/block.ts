import { NumberLiteralType } from "typescript";
// import {GENESIS_DATA,MINED_RATE} from "./config";
// import GENESIS_DATA from './config'
import { GENESIS_DATA, MINED_RATE } from "./config";
import cryptoHash from "./cryto-hash";
import { block, MinedBlock } from "./utils/Interfaces";

interface adjustDifficulty {
  originalBlock: Block;
  timestamp: Date;
}

class Block {
  constructor(
    public timestamp: Date,
    public lastHash: String,
    public hash: String,
    public data: any,
    public nonce: number,
    public difficulty: number
  ) {}

  static genesis() {
    return new Block(
      GENESIS_DATA.timestamp,
      GENESIS_DATA.lastHash,
      GENESIS_DATA.hash,
      GENESIS_DATA.data,
      GENESIS_DATA.nonce,
      GENESIS_DATA.difficulty
    );
  }

  static minedBlock({ lastBlock, data }: MinedBlock) {
    let timestamp;
    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;
    let hash;
    let nonce = 0;

    do {
      timestamp = new Date();
      nonce++;
      difficulty = this.adjustDifficulty({
        originalBlock: lastBlock,
        timestamp,
      });
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
      //   console.log("minedBlock=========", hash);
      //   console.log("difficulty======", difficulty);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new Block(timestamp, lastHash, hash, data, nonce, difficulty);
  }

  static adjustDifficulty({ originalBlock, timestamp }: adjustDifficulty) {
    const { difficulty } = originalBlock;
    if (timestamp.valueOf() - originalBlock.timestamp.valueOf() > MINED_RATE) {
      return difficulty - 1;
    }
    return difficulty + 1;
  }
}

export default Block;
