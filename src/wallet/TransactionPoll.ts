import Transaction from "./Transactions";

class TransactionPool {
  transactionMap: any;

  constructor() {
    this.transactionMap = {};
  }

  setTransaction(transaction: any) {
    this.transactionMap[transaction.id] = transaction;
  }
}

export default TransactionPool;
