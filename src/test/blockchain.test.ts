import Block from "../block";
import Blockchain from "../blockchain";
describe("Blockchain", () => {
  const blockchain = new Blockchain();
  it("should be an array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("should start with genesis block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("add new block to chain", () => {
    const newData = "foo-bar";
    blockchain.addBlock({ data: newData });
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });
});
