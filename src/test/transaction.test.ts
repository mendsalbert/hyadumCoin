import Wallet from "../wallet/Index";
import Transaction from "../wallet/Transactions";

describe("Transaction", () => {
  let transaction: Transaction,
    senderWallet: Wallet,
    recipeint: string,
    amount: number;

  beforeEach(() => {
    senderWallet = new Wallet();
    recipeint = "recipient-public-key";
    amount = 50;
    transaction = new Transaction(senderWallet, recipeint, amount);
  });

  it("has an id", () => {
    expect(transaction).toHaveProperty("id");
  });

  it("has output map", () => {
    expect(transaction).toHaveProperty("outputMap");
  });
});
