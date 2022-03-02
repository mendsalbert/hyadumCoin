// const redis = require("redis");
import redis from "redis";
const CHANNEL = {
  TEST: "TEST",
};
class PubSub {
  subscriber: any;
  publisher: any;
  constructor() {
    this.subscriber = redis.createClient();
    this.publisher = redis.createClient();

    this.subscriber.subscribe(CHANNEL.TEST);

    this.subscriber.on("message", (channel: any, message: any) =>
      this.handleMessage(channel, message)
    );
  }

  handleMessage(channel: any, message: any) {
    console.log("message recieved", channel, message);
  }
}

const testPub = new PubSub();
testPub.publisher.publish(CHANNEL.TEST, "FOO");
