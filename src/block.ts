import GENESIS_DATA from "./config";
import cryptoHash from "./cryto-hash";
import { MinedBlock } from "./utils/Interfaces";

class Block {
  constructor(
    public timestamp: Date,
    public lastHash: String,
    public hash: String,
    public data: any
  ) {}

  static genesis() {
    return new Block(
      GENESIS_DATA.timestamp,
      GENESIS_DATA.lastHash,
      GENESIS_DATA.hash,
      GENESIS_DATA.data
    );
  }

  static minedBlock({ lastBlock, data }: MinedBlock) {
    const timestamp = new Date();
    const lastHash = lastBlock.hash;

    return new Block(
      timestamp,
      lastHash,
      cryptoHash(timestamp, lastHash, data),
      data
    );
  }
}

export default Block;

// module.exports = Block;
