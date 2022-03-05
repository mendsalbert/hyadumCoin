import Transaction from "./Transactions";

class TransactionPool {
  transaction: any;
  transactionMap: any;

  constructor() {
    this.transaction = {};
  }

  setTransaction(transaction: Transaction) {
    this.transactionMap[transaction.id] = transaction;
  }
}

export default TransactionPool;
