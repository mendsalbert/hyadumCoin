import Block from "../block";
import { GENESIS_DATA } from "../config";
import cryptoHash from "../cryto-hash";
interface block {
  timestamp: Date;
  lastHash: String;
  hash: String;
  data: any;
  nonce: number;
  difficulty: number;
}
describe("Block", () => {
  const timestamp = new Date();
  const lastHash = "foo-hash";
  const hash = "hash";
  const data = "data";
  const nonce = 1;
  const difficulty = 1;
  const block = new Block(timestamp, lastHash, hash, data, nonce, difficulty);

  it("has timestamp, lastHash, hash, data, nonce, difficulty", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
    expect(block.nonce).toEqual(nonce);
    expect(block.difficulty).toEqual(difficulty);
  });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();
    it("return a block instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it("returns the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe("mineBlock()", () => {
    const lastBlock = Block.genesis();
    const data = "mined data";
    const minedBlock = Block.minedBlock({ lastBlock, data });

    it("return block instance", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it("sets the `lasthash` to be the `hash` of the lastBlock", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("sets a data", () => {
      expect(minedBlock.data).toEqual(data);
    });

    it("sets a timestamp", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it("create SHA 256 Based on proper inputs", () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(
          minedBlock.timestamp,
          minedBlock.lastHash,
          minedBlock.data,
          minedBlock.nonce,
          minedBlock.difficulty
        )
      );
    });

    it("set a hash that matches difficulty", () => {
      expect(minedBlock.hash.substring(0, minedBlock.difficulty)).toEqual(
        "0".repeat(minedBlock.difficulty)
      );
    });
  });
});
