import { verifySignature } from "../utils";
import Wallet from "../wallet";

describe("Wallet", () => {
  let wallet: Wallet;
  beforeEach(() => {
    wallet = new Wallet();
  });

  it("has balance", () => {
    expect(wallet).toHaveProperty("balance");
  });
  it("has public key", () => {
    console.log(wallet.publicKey);
    expect(wallet).toHaveProperty("publicKey");
  });

  describe("signing data", () => {
    const data = "foo-bar";
    it("verifies data", () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data: data,
          signature: wallet.sign(data),
        })
      ).toBe(true);
    });

    it("verifies data fails", () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data: data,
          signature: new Wallet().sign(data),
        })
      ).toBe(false);
    });
  });
});
