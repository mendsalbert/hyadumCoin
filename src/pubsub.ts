// // import redis from "redis";
// const redis = require("redis");
// const CHANNEL = {
//   TEST: "TEST",
// };
// class PubSub {
//   constructor() {
//     this.subscriber = redis.createClient(6379, "127.0.0.1");
//     this.publisher = redis.createClient(6379, "127.0.0.1");

//     this.subscriber.subscribe(CHANNEL.TEST);

//     this.subscriber.on("message", (channel, message) =>
//       this.handleMessage(channel, message)
//     );
//   }

//   handleMessage(channel, message) {
//     console.log("message recieved", channel, message);
//   }
// }

// const testPub = new PubSub();
// testPub.publisher.publish(CHANNEL.TEST, "FOO");

const redis = require("redis");

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

    this.subscriber.on("message", (channel: string, message: string) =>
      this.handleMessage(channel, message)
    );
  }

  handleMessage(channel: string, message: string) {
    console.log("recieved data", message);
    console.log("chanell", channel);
  }
}

const pubsub = new PubSub();

setTimeout(() => {
  pubsub.publisher.publish(CHANNEL.TEST, "foo");
}, 1000);
