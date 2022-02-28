class Block {
  constructor(
    public timestamp: Date,
    public lastHash: String,
    public hash: String,
    public data: any
  ) {}
}

const block1 = new Block(new Date(), "foo-hash", "boo-hash", "block data");
console.log(block1);
