import { STARTING_BALANCE } from "../config";
import { ec } from "../utils";
import cryptoHash from "../utils/cryto-hash";
import Transaction from "../wallet/Transactions";
class Wallet {
  balance: number;
  publicKey: string;
  keypair: any;
  constructor() {
    this.balance = STARTING_BALANCE;
    this.keypair = ec.genKeyPair();
    this.publicKey = this.keypair.getPublic().encode("hex");
  }

  sign(data: string) {
    cryptoHash();
    return this.keypair.sign(cryptoHash(data));
  }

  createTransaction(recipient: string, amount: number) {
    if (amount > this.balance) {
      console.log("balance is insuficient");
      return;
    }
    return new Transaction(this, recipient, amount);
  }
}

export default Wallet;
// export default Wallet;
