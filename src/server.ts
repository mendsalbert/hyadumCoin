import express, { Application, Request, Response } from "express";
// import Blockchain from "./blockchain/index";
import Blockchain from "./Blockchain/index";
import PubSub from "./app/pubsub";
import Wallet from "./wallet/Index";
import TransactionPool from "./wallet/TransactionPoll";
import Transaction from "./wallet/Transactions";
import TransactionMiner from "./app/TransactionMiner";
import path from "path";
var cors = require("cors");
// import cors from 'cors'
const isDevelopment = process.env.ENV === "development";
const REDIS_URL = isDevelopment
  ? "redis://127.0.0.1:3679"
  : "redis-10210.c85.us-east-1-2.ec2.cloud.redislabs.com";
const REDIS_PORT = 10210;
const REDIS_PASSWORD = "6pfduYUSZUDGEvZhcC1OWvmbplN6RA2J";

const DEFAULT_PORT = 3002;
let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const port = process.env.PORT || PEER_PORT || DEFAULT_PORT;
const ROOT_NODE_ADDERSS = `http://localhost:${DEFAULT_PORT}`;

const request = require("request");
const app: Application = express();
app.use(cors());
const blockchain: Blockchain = new Blockchain();
const wallet: Wallet = new Wallet();
const transactionPoll: TransactionPool = new TransactionPool();
const pubsub: PubSub = new PubSub(
  blockchain,
  transactionPoll,
  REDIS_URL,
  REDIS_PORT,
  REDIS_PASSWORD
);
const transactionMiner: TransactionMiner = new TransactionMiner(
  blockchain,
  transactionPoll,
  wallet,
  pubsub
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req: Request, res: Response) => {
//   res.send("home page");
// });

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

app.post("/api/transact", async (req: Request, res: Response) => {
  const { recipient, amount } = req.body;

  let transaction: any = transactionPoll.existingTransaction(wallet.publicKey);

  try {
    if (transaction) {
      transaction.update(wallet, recipient, amount);
    } else {
      transaction = wallet.createTransction(recipient, amount);
    }
  } catch (error: any) {
    return res.status(400).json({ type: "error", message: error.message });
  }

  transactionPoll.setTransaction(transaction);
  pubsub.broadcastTransaction(transaction);
  res.json({ type: "success", transaction });
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

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "./client/index.html"));
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

// if (isDevelopment) {
const walletFoo = new Wallet();
const walletBar = new Wallet();

const generateWalletTransaction = (wallet: any, recipient: any, amout: any) => {
  const transaction = wallet.createTransction(
    recipient,
    amout,
    blockchain.chain
  );
  transactionPoll.setTransaction(transaction);
};

const walletAction = () =>
  generateWalletTransaction(wallet, walletFoo.publicKey, 5);
const walletFooAction = () =>
  generateWalletTransaction(wallet, walletBar.publicKey, 10);
const walletBarAction = () =>
  generateWalletTransaction(wallet, wallet.publicKey, 20);

for (let i = 0; i < 10; i++) {
  if (i % 3 === 0) {
    walletAction();
    walletFooAction();
  } else if (i % 3 === 1) {
    walletAction();
    walletBarAction();
  } else {
    walletFooAction();
    walletBarAction();
  }

  transactionMiner.mineTransactions();
}
// }

try {
  app.listen(port, (): void => {
    syncChains();
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
