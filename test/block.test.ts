const Block_ = require("../src/block");

describe("Block", () => {
  const timestamp = new Date();
  const lastHash = "foo-hash";
  const hash = "hash";
  const data = "data";
  const block = new Block_(timestamp, lastHash, hash, data);

  it("has timestamp, lastHash, hash, date", () => {
    expect(block.timestamp).toEqual(timestamp);
  });
});
