import Blockchain from "../blockchain";
import Wallet from "../wallet/Index";
import TransactionPool from "../wallet/TransactionPoll";
import PubSub from "./pubsub";

class TransactionMiner {
  blockchain: Blockchain;
  transactionPoll: TransactionPool;
  wallet: Wallet;
  pubSub: PubSub;

  constructor(
    blockchain: Blockchain,
    transactionPoll: TransactionPool,
    wallet: Wallet,
    pubsub: PubSub
  ) {
    this.blockchain = blockchain;
    this.transactionPoll = transactionPoll;
    this.wallet = wallet;
    this.pubSub = pubsub;
  }

  mineTransactions() {
    //get all valid transactions from transaction pool
    //generate the miner;s reware
    //add a block consisting of these transactions to the blockchian
    //broacast the updated blockchain
    //clear transaction poop
  }
}

export default TransactionMiner;
