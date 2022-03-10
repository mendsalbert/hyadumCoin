import express, { Application, Request, Response } from "express";
import Blockchain from "./blockchain";
import PubSub from "./app/pubsub";
import Wallet from "./wallet/Index";
import TransactionPool from "./wallet/TransactionPoll";
import Transaction from "./wallet/Transactions";
import TransactionMiner from "./app/TransactionMiner";
import { resourceUsage } from "process";
const request = require("request");
const app: Application = express();

const blockchain: Blockchain = new Blockchain();
const wallet: Wallet = new Wallet();
const transactionPoll: TransactionPool = new TransactionPool();
const pubsub: PubSub = new PubSub(blockchain, transactionPoll);
const transactionMiner: TransactionMiner = new TransactionMiner(
  blockchain,
  transactionPoll,
  wallet,
  pubsub
);

const DEFAULT_PORT = 3000;
let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const port = PEER_PORT || DEFAULT_PORT;
const ROOT_NODE_ADDERSS = `http://localhost:${DEFAULT_PORT}`;

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

app.post("/api/transact", (req: Request, res: Response) => {
  const { recipient, amount } = req.body;

  let transaction: any = transactionPoll.existingTransaction(wallet.publicKey);

  try {
    if (transaction) {
      transaction.update(wallet, recipient, amount);
    } else {
      transaction = wallet.createTransction(recipient, amount, blockchain);
    }

    transactionPoll.setTransaction(transaction);

    pubsub.broadcastTransaction(transaction);
    res.json(transaction);
    return;
  } catch (error) {
    res.json({ type: "error", message: error });
  }
});

app.get("/api/transaction-poll", (req: Request, res: Response) => {
  res.status(200).json({
    transactionPoll: transactionPoll.transactionMap,
  });
});

app.get("/api/mine-transaction", (req: Request, res: Response) => {
  transactionMiner.mineTransactions();
  res.redirect("/api/blocks");
});

app.get("/api/wallet-info", (req: Request, res: Response) => {
  const address = wallet.publicKey;
  res.json({
    address: address,
    balance: Wallet.calculateBalance(blockchain.chain, address),
  });
});
const syncChains = () => {
  request(
    { url: `${ROOT_NODE_ADDERSS}/api/blocks` },
    (error: any, response: any, body: any) => {
      if (!error && response.statusCode === 200) {
        const chain = JSON.parse(body);
        // console.log(chain);
        blockchain.replaceChain(chain);
      }
    }
  );

  request(
    { url: `${ROOT_NODE_ADDERSS}/api/transaction-poll` },
    (error: any, response: any, body: any) => {
      if (!error && response.statusCode === 200) {
        const rootTransactionPoolMap = JSON.parse(body);
        transactionPoll.setMap(rootTransactionPoolMap.transactionPoll);
        console.log(rootTransactionPoolMap.transactionPoll);
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
