const MINED_RATE = 1000;
const INITIAL_DIFFICULTY = 3;
const GENESIS_DATA: {
  timestamp: Date;
  lastHash: string;
  hash: string;
  data: any;
  nonce: number;
  difficulty: number;
} = {
  timestamp: new Date(),
  lastHash: "foo-hash",
  hash: "foo-hash",
  data: "any",
  nonce: 0,
  difficulty: INITIAL_DIFFICULTY,
};

export { GENESIS_DATA, MINED_RATE };
