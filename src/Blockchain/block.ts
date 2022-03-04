// import hexToBinary from 'hex-to-binary';
var hexToBinary = require("hex-to-binary");
import { GENESIS_DATA, MINED_RATE } from "../config";
import cryptoHash from "../utils/cryto-hash";
import { block, MinedBlock } from "../utils/Interfaces";

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
    } while (
      hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );

    return new Block(timestamp, lastHash, hash, data, nonce, difficulty);
  }

  static adjustDifficulty({ originalBlock, timestamp }: adjustDifficulty) {
    const { difficulty } = originalBlock;
    if (timestamp.valueOf() - originalBlock.timestamp.valueOf() > MINED_RATE) {
      return difficulty - 1;
    }
    if (difficulty < 1) return 1;
    return difficulty + 1;
  }
}

export default Block;
