import Transaction from "./Transactions";

class TransactionPool {
  transactionMap: any;

  constructor() {
    this.transactionMap = {};
  }

  existingTransaction(inputAddres: any) {
    const transactions = Object.values(this.transactionMap);
    return transactions.find((transaction: any) => {
      return transaction.input.address === inputAddres;
    });
  }

  setTransaction(transaction: any) {
    this.transactionMap[transaction.id] = transaction;
  }
}

export default TransactionPool;
