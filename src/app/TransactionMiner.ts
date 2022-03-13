import Blockchain from "../Blockchain/index";
import Wallet from "../wallet/Index";
import TransactionPool from "../wallet/TransactionPoll";
import Transaction from "../wallet/Transactions";
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
    const validTransactions = this.transactionPoll.validTransactions();

    validTransactions.push(Transaction.rewardTransaction(this.wallet));

    this.blockchain.addBlock({ data: validTransactions });

    this.pubSub.broadcastChain();

    this.transactionPoll.clear();
  }
}

export default TransactionMiner;
