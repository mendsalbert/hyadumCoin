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
    console.log("chanell", channel);
  }

  subscribeToChanels() {
    Object.values(CHANNEL).forEach((channel) => {
      this.subscriber.subscribe(channel);
    });
  }

  publish({ channel, message }: any) {}
}

export default PubSub;
