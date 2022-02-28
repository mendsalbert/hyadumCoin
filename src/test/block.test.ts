import Block from "../block";
import GENESIS_DATA from "../config";
describe("Block", () => {
  const timestamp = new Date();
  const lastHash = "foo-hash";
  const hash = "hash";
  const data = "data";
  const block = new Block(timestamp, lastHash, hash, data);

  it("has timestamp, lastHash, hash, date", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();
    console.log("genesisBlock", genesisBlock);
    console.log("genesis data", GENESIS_DATA);
    it("return a block instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it("returns the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });
});
