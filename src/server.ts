import express, { Application, Request, Response } from "express";
import Blockchain from "./blockchain";
import PubSub from "./pubsub";
const app: Application = express();

const blockchain = new Blockchain();
const port = 3000;

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
  res.redirect("/api/blocks");
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
