import GENESIS_DATA from "./config";
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
    // return new Block(new Date(), "foo-hash", "foo-hash", "any");
  }
}

export default Block;

// module.exports = Block;
