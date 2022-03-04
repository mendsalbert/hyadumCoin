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
});
