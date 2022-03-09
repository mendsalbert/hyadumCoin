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
    return this.keypair.sign(cryptoHash(data));
  }

  createTransction(recipient: string, amount: number, chain: any) {
    if (chain) {
      this.balance = Wallet.calculateBalance(chain, this.publicKey);
    }
    if (amount > this.balance) {
      console.log("balance is not enough");
      return;
    } else {
      return new Transaction(this, recipient, amount);
    }
  }

  static calculateBalance(chain: any, address: string) {
    let totalBalance: any;
    for (let i = 0; i < chain.length; i++) {
      let block = chain[i];

      for (let transaction of block.data) {
        let addressOutput = transaction.outputMap[address];
        if (addressOutput) {
          totalBalance = totalBalance + addressOutput;
        }
      }
    }

    return STARTING_BALANCE + totalBalance;
  }
}

export default Wallet;
