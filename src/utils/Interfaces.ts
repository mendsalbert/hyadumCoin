//Block class interfaces

export interface MinedBlock {
  lastBlock: {
    timestamp: Date;
    lastHash: String;
    hash: String;
    data: any;
  };
  data: any;
}
