import Wallet from "./Index";
const uuid = require("uuid/v1");
interface Transaction {
  senderWallet: Wallet;
  recipient: string;
  amount: number;
}
class Transaction {
  id: string;
  outputMap: any;
  constructor(senderWallet: Wallet, recipient: string, amount: number) {
    this.id = uuid();
    this.outputMap = this.createOutputMap(senderWallet, recipient, amount);
  }

  createOutputMap(senderWallet: Wallet, recipient: string, amount: number) {
    const outputMap: any = {};
    outputMap[recipient] = amount;
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount;
    return outputMap;
  }
}

export default Transaction;
