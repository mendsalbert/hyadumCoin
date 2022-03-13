import Blockchain from "../blockchain/index";
import TransactionPool from "../wallet/TransactionPoll";

const redis = require("redis");
const CHANNEL = {
  TEST: "TEST",
  BLOCKCHIAN: "BLOCKCHAIN",
  TRANSACTION: "TRANSACTION",
};

class PubSub {
  subscriber: any;
  publisher: any;
  transaction: any;
  blockchain: Blockchain;
  constructor(blockchain: Blockchain, transaction: TransactionPool) {
    this.blockchain = blockchain;
    this.subscriber = redis.createClient();
    this.publisher = redis.createClient();
    this.transaction = transaction;
    this.subscribeToChanels();

    this.subscriber.on("message", (channel: string, message: string) =>
      this.handleMessage(channel, message)
    );
  }

  handleMessage(channel: string, message: string) {
    console.log("recieved data", message);
    console.log("channel", channel);

    const parseData = JSON.parse(message);

    switch (channel) {
      case CHANNEL.BLOCKCHIAN:
        this.blockchain.replaceChain(parseData, true, () => {
          this.transaction.clearBlockchainTransactions(parseData);
        });
        break;

      case CHANNEL.TRANSACTION:
        this.transaction.setTransaction(parseData);
      default:
        return;
    }
  }

  subscribeToChanels() {
    Object.values(CHANNEL).forEach((channel) => {
      this.subscriber.subscribe(channel);
    });
  }

  publish({ channel, message }: any) {
    this.publisher.publish(channel, message);
  }

  broadcastChain() {
    this.publish({
      channel: CHANNEL.BLOCKCHIAN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  broadcastTransaction(transaction: any) {
    this.publish({
      channel: CHANNEL.TRANSACTION,
      message: JSON.stringify(transaction),
    });
  }
}

export default PubSub;
