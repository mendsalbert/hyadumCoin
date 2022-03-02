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
    public difficulty: number,
    public nonce: number
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
    const timestamp = new Date();
    const lastHash = lastBlock.hash;
    const { difficulty } = lastBlock;
    let nonce: number = 0;
    return new Block(
      timestamp,
      lastHash,
      cryptoHash(timestamp, lastHash, data, nonce, difficulty),
      data,
      nonce,
      difficulty
    );
  }
}

export default Block;

// module.exports = Block;
