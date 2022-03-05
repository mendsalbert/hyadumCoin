import crypto from "crypto";

const cryptoHash = (...inputs: any) => {
  const hash = crypto.createHash("sha256");
  hash.update(
    inputs
      .map((input: string) => JSON.stringify(input))
      .sort()
      .join(" ")
  );
  return hash.digest("hex");
};

export default cryptoHash;
