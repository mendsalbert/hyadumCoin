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

const subscriber = redis.createClient();
const publisher = redis.createClient();

subscriber.on("message", (channel, message) => {
  console.log("Received data :" + message);
});

subscriber.subscribe("user-notify");

setTimeout(() => {
  publisher.publish("user-notify", "foo");
}, 200);
