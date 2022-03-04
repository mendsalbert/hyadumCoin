import { STARTING_BALANCE } from "../config";
// import ec from "../utils";
// import {ec}  from 'elliptic'
import { ec } from "../utils";
import cryptoHash from "../utils/cryto-hash";

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
}

export default Wallet;
