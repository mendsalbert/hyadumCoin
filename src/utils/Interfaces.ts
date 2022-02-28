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

export interface block {
  timestamp: Date;
  lastHash: String;
  hash: String;
  data: any;
}
