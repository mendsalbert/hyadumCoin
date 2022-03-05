import Wallet from "../wallet/Index";
import TransactionPool from "../wallet/TransactionPoll";
import Transaction from "../wallet/Transactions";

describe("TransactionPool", () => {
  let transactionPool: TransactionPool, transaction: Transaction;

  beforeEach(() => {
    transactionPool = new TransactionPool();
    let senderWallet = new Wallet();
    transaction = new Transaction(senderWallet, "fake-recipient", 50);
  });

  describe("setTransaction", () => {
    it("adds a transaction", () => {
      transactionPool.setTransaction(transaction);
      expect(transactionPool.transactionMap[transaction.id]).toBe(transaction);
    });
  });
});
