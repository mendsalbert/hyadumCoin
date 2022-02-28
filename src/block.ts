import GENESIS_DATA from "./config";
// interface minedBlock {
//   lastBlock: {
//     timestamp: Date;
//     lastHash: String;
//     hash: String;
//     data: any;
//   };
//   data: any;
// }

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

  static minedBlock({ lastBlock, data }: any) {
    return new Block(new Date(), lastBlock.hash!, "hash", data);
  }
}

export default Block;

// module.exports = Block;
