import cryptoHash from "./cryto-hash";
import { VerifySignature } from "./Interfaces";

const EC = require("elliptic").ec;
var ec = new EC("secp256k1");

const verifySignature = ({ publicKey, data, signature }: VerifySignature) => {
  const keyFromPublic = ec.keyFromPublic(publicKey, "hex");
  return keyFromPublic.verify(cryptoHash(data), signature);
};

export { ec, verifySignature };
