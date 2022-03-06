import Transaction from "./Transactions";

class TransactionPool {
  transactionMap: any;

  constructor() {
    this.transactionMap = {};
  }

  clear() {
    this.transactionMap = {};
  }
  existingTransaction(inputAddres: any) {
    const transactions = Object.values(this.transactionMap);
    return transactions.find((transaction: any) => {
      return transaction.input.address === inputAddres;
    });
  }

  setMap(transactionPoll: TransactionPool) {
    this.transactionMap = transactionPoll;
  }

  setTransaction(transaction: any) {
    this.transactionMap[transaction.id] = transaction;
  }

  validTransactions() {
    return Object.values(this.transactionMap).filter((transaction: any) =>
      Transaction.validateTransaction(transaction)
    );
  }
}

export default TransactionPool;
