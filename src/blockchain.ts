import Block from "./block";
import { block } from "./utils/Interfaces";
class Blockchain {
  chain: [block];
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
}

// const blockchain = new Blockchain();
// blockchain.addBlock({ data: "mends albert" });
// blockchain.addBlock({ data: "elon musk" });
// blockchain.addBlock({ data: "steve jobs" });
// blockchain.addBlock({ data: "bill gates" });
// console.log(blockchain);

export default Blockchain;
