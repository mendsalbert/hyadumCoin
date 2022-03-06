import Wallet from "../wallet/Index";
import TransactionPool from "../wallet/TransactionPoll";
import Transaction from "../wallet/Transactions";

describe("TransactionPool", () => {
  let transactionPool: TransactionPool,
    transaction: Transaction,
    senderWallet: Wallet;

  beforeEach(() => {
    transactionPool = new TransactionPool();
    senderWallet = new Wallet();
    transaction = new Transaction(senderWallet, "fake-recipient", 50);
  });

  describe("setTransaction", () => {
    it("adds a transaction", () => {
      transactionPool.setTransaction(transaction);
      expect(transactionPool.transactionMap[transaction.id]).toBe(transaction);
    });
  });

  describe("validTransactions", () => {
    let validTransactions: any;

    beforeEach(() => {
      validTransactions = [];
      for (let i = 0; i < 10; i++) {
        transaction = new Transaction(senderWallet, "any-recipient", 30);

        if (i % 3 === 0) {
          transaction.input.amount = 88888;
        } else if (i % 3 === 1) {
          transaction.input.signature = new Wallet().sign("foo");
        } else {
          validTransactions.push(transaction);
        }
        transactionPool.setTransaction(transaction);
      }
    });

    it("returns valid transactions", () => {
      expect(transactionPool.validTransactions()).toEqual(validTransactions);
    });
  });
});
