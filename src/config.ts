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

export default GENESIS_DATA;

// module.exports = { GENESIS_D/ATA };
