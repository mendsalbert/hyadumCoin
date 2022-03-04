import cryptoHash from "../utils/cryto-hash";

describe("cryptoHash()", () => {
  it("generate sha256 hash", () => {
    expect(cryptoHash("foo")).toEqual(
      "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
    );
  });

  it("should produce same output irrespective of the order in input", () => {
    expect(cryptoHash("one", "two", "three")).toEqual(
      cryptoHash("two", "three", "one")
    );
  });
});
