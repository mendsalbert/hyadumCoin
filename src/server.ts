import express, { Application, Request, Response } from "express";
import Blockchain from "./blockchain";
import PubSub from "./pubsub";
const request = require("request");
const app: Application = express();

const blockchain = new Blockchain();

const DEFAULT_PORT = 3000;
let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const port = PEER_PORT || DEFAULT_PORT;
const ROOT_NODE_ADDERSS = `http://localhost:${DEFAULT_PORT}`;
const pubsub = new PubSub({ blockchain });

setTimeout(() => {
  pubsub.broadcastChain();
}, 1000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/blocks", (req: Request, res: Response) => {
  res.status(200).json({
    blockchain: blockchain,
  });
});

app.post("/api/mine", (req: Request, res: Response) => {
  const { data } = req.body;
  blockchain.addBlock({ data });
  pubsub.broadcastChain();
  res.redirect("/api/blocks");
});

const syncChains = () => {
  request(
    { url: `${ROOT_NODE_ADDERSS}/api/blocks` },
    (error: any, response: any, body: any) => {
      if (!error && response.statusCode === 200) {
        const chain = JSON.parse(body);
        console.log(chain);
        blockchain.replaceChain(chain);
      }
    }
  );
};

try {
  app.listen(port, (): void => {
    syncChains();
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
