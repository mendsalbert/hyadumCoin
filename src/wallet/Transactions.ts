import Wallet from "./Index";
const uuid = require("uuid/v1");
interface Transaction {
  senderWallet: Wallet;
  recipient: string;
  amount: number;
}
class Transaction {
  id: string;
  constructor({ senderWallet, recipient, amount }: Transaction) {
    this.id = uuid();
  }
}
