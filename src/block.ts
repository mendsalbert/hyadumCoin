import { NumberLiteralType } from "typescript";
import GENESIS_DATA from "./config";
import cryptoHash from "./cryto-hash";
import { MinedBlock } from "./utils/Interfaces";

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
    // const timestamp = new Date();
    let hash;
    const lastHash = lastBlock.hash;
    const { difficulty } = lastBlock;
    let nonce = 0;

    do {
      timestamp = new Date();
      nonce++;
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
      console.log("minedBlock=========", hash);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new Block(timestamp, lastHash, hash, data, nonce, difficulty);
  }
}

export default Block;

// module.exports = Block;
