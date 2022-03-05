import { verifySignature } from "../utils";
import Wallet from "./Index";
const uuid = require("uuid/v1");
interface Transaction {
  senderWallet: Wallet;
  recipient: string;
  amount: number;
}
class Transaction {
  public id: string;
  public outputMap: any;
  public input: any;
  constructor(senderWallet: Wallet, recipient: string, amount: number) {
    this.id = uuid();
    this.outputMap = this.createOutputMap(senderWallet, recipient, amount);
    this.input = this.createInput(senderWallet, this.outputMap);
  }

  createOutputMap(senderWallet: Wallet, recipient: string, amount: number) {
    const outputMap: any = {};
    outputMap[recipient] = amount;
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount;
    return outputMap;
  }

  createInput(senderWallet: Wallet, outputMap: any) {
    return {
      timestamp: new Date(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(outputMap),
    };
  }

  update(senderWallet: Wallet, recipeint: string, amount: number) {
    if (amount > this.outputMap[senderWallet.publicKey]) {
      return;
    }

    if (!this.outputMap[recipeint]) {
      this.outputMap[recipeint] = amount;
    } else {
      this.outputMap[recipeint] = this.outputMap[recipeint] + amount;
    }
    this.outputMap[senderWallet.publicKey] =
      this.outputMap[senderWallet.publicKey] - amount;
    this.input = this.createInput(senderWallet, this.outputMap);
  }

  static validateTransaction(transaction: Transaction) {
    const {
      input: { amount, address, signature },
      outputMap,
    } = transaction;

    const outputTotal = Object.values(outputMap).reduce(
      (total: any, outputAmount: any) => total + outputAmount
    );

    if (amount !== outputTotal) {
      return false;
    }
    if (
      !verifySignature({
        publicKey: address,
        data: outputMap,
        signature: signature,
      })
    ) {
      return false;
    }

    return true;
  }
}

export default Transaction;
