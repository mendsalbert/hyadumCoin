import Blockchain from "../Blockchain/index";
import { MINED_REWARD, REWARD_INPUT } from "../config";
import Wallet from "../wallet/Index";
import TransactionPool from "../wallet/TransactionPoll";
import Transaction from "../wallet/Transactions";

describe("Transaction", () => {
  let transaction: Transaction,
    senderWallet: Wallet,
    recipeint: string,
    amount: any,
    transactionPool: TransactionPool;

  beforeEach(() => {
    recipeint = "recipient-public-key";
    amount = 50;
    senderWallet = new Wallet();
    transaction = new Transaction(senderWallet, recipeint, amount);
    transactionPool = new TransactionPool();
  });

  it("has an id", () => {
    expect(transaction).toHaveProperty("id");
  });

  describe("outputMap", () => {
    it("has output map", () => {
      expect(transaction).toHaveProperty("outputMap");
    });

    it("output the amout of recipient", () => {
      expect(transaction.outputMap[recipeint]).toEqual(amount);
    });

    it("output the amout of sender", () => {
      expect(transaction.outputMap[senderWallet.publicKey]).toEqual(
        senderWallet.balance - amount
      );
    });
  });

  describe("rewardTransaction", () => {
    let rewardTransaction: Transaction, minerWallet: Wallet;

    beforeEach(() => {
      minerWallet = new Wallet();
      rewardTransaction = Transaction.rewardTransaction(minerWallet);
    });

    it("creates a transaction with the reward input", () => {
      expect(rewardTransaction.input).toEqual(REWARD_INPUT);
    });

    it("creates one transaction for the miner with the MINER REWARD", () => {
      expect(rewardTransaction.outputMap[minerWallet.publicKey]).toEqual(
        MINED_REWARD
      );
    });
  });

  describe("clearBlockchainTransactions", () => {
    it("clears the pool of any existig blockchain transactions", () => {
      const blockchain: Blockchain = new Blockchain();
      const expectedTransactionMap: any = {};
      for (let i = 0; i < 6; i++) {
        const transc: any = new Wallet().createTransction("foo", 20);
        transactionPool.setTransaction(transc);
        if (i % 2 === 0) {
          blockchain.addBlock({ data: [transc] });
        } else {
          expectedTransactionMap[transc.id] = transc;
        }
      }

      transactionPool.clearBlockchainTransactions(blockchain.chain);
      expect(transactionPool.transactionMap).toEqual(expectedTransactionMap);
    });
  });
});
