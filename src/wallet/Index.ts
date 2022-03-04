import { STARTING_BALANCE } from "../config";
// import ec from "../utils";
// import {ec}  from 'elliptic'
import ec from "../utils";

class Wallet {
  balance: number;
  publicKey: string;
  constructor() {
    this.balance = STARTING_BALANCE;
    const keypair = ec.genKeyPair();
    this.publicKey = keypair.getPublic();
  }
}

export default Wallet;
