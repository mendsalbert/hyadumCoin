const redis = require("redis");

const CHANNEL = {
  TEST: "TEST",
  BLOCKCHIAN: "TEST",
};
class PubSub {
  subscriber: any;
  publisher: any;
  blockchain: any;
  constructor({ blockchain }: any) {
    this.blockchain = blockchain;
    this.subscriber = redis.createClient();
    this.publisher = redis.createClient();

    this.subscribeToChanels();

    this.subscriber.on("message", (channel: string, message: string) =>
      this.handleMessage(channel, message)
    );
  }

  handleMessage(channel: string, message: string) {
    console.log("recieved data", message);
    console.log("channel", channel);

    const parseData = JSON.parse(message);
    if (channel === CHANNEL.BLOCKCHIAN) {
      this.blockchain.replaceChain(parseData);
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
      CHANNEL: CHANNEL.BLOCKCHIAN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }
}

export default PubSub;
