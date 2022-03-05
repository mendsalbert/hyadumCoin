import Wallet from "../wallet/Index";
import Transaction from "../wallet/Transactions";

describe("Transaction", () => {
  let transaction: Transaction,
    senderWallet: Wallet,
    recipeint: string,
    amount: any;

  beforeEach(() => {
    recipeint = "recipient-public-key";
    amount = 50;
    transaction = new Transaction(new Wallet(), recipeint, amount);
  });

  it("has an id", () => {
    expect(transaction).toHaveProperty("id");
  });

  describe("outputMap", () => {
    it("has output map", () => {
      expect(transaction).toHaveProperty("outputMap");
    });

    it("output the amout of recipient", () => {
      expect(transaction.outputMap[recipeint]).toEqual(amount);
    });

    it("output the amout of sender", () => {
      let balance: any = senderWallet.balance - amount;
      expect(transaction.outputMap[senderWallet.publicKey]).toEqual(balance);
    });
  });
});
