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
// export default {
//   GENESIS_DATA: GENESIS_DATA,
//   MINED_RATE: MINED_RATE,
// };
// ex/port default GENESIS_DATA  MINED_RATE;
// module.exports = { GENESIS_DATA, MINED_RATE };
// export default { GENESIS_D/ATA };
// module.exports = { GENESIS_D/ATA };
