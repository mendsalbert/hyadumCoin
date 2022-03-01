import Block from "../block";
import Blockchain from "../blockchain";
import { block } from "../utils/Interfaces";
describe("Blockchain", () => {
  let blockchain: Blockchain, newchain: Blockchain, originalChain: any;

  beforeEach(() => {
    blockchain = new Blockchain();
    newchain = new Blockchain();
    originalChain = blockchain.chain;
  });
  it("should be an array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("should start with genesis block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("add new block to chain", () => {
    const newData = "foo-bar";
    blockchain.addBlock({ data: newData });
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });

  describe("isValidChain", () => {
    describe("when chain does not start with genesis block", () => {
      it("return false", () => {
        blockchain.chain[0] = { data: "fake-data" };
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe("when the chain start with a genesis block and has multiple blocks", () => {
      beforeEach(() => {
        blockchain.addBlock({ data: "mends albert" });
        blockchain.addBlock({ data: "elon musk" });
        blockchain.addBlock({ data: "steve jobs" });
      });
      describe("and last has reference has changes", () => {
        it("returns flase", () => {
          blockchain.chain[2].lastHash = "broken hash";
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe("and the chain contains an invalid block", () => {
        it("return false", () => {
          blockchain.chain[2].data = "some-evil-data";
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      describe("and the chain contains an valid block", () => {
        it("return true", () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });

  describe("replaceChain", () => {
    let errorMock: any, logMock: any;

    beforeEach(() => {
      errorMock = jest.fn();
      logMock = jest.fn();
      global.console.error = errorMock;
      global.console.log = logMock;
    });

    describe("when the chain is longer", () => {
      beforeEach(() => {
        newchain.addBlock({ data: "mends albert" });
        newchain.addBlock({ data: "elon musk" });
        newchain.addBlock({ data: "steve jobs" });
      });
      describe("and the chain is invalid", () => {
        beforeEach(() => {
          newchain.chain[2].hash = "some fake data";
          blockchain.replaceChain(newchain.chain);
        });
        it("does not replace chain", () => {
          expect(blockchain.chain).toEqual(originalChain);
        });

        it("logs error", () => {
          expect(errorMock).toHaveBeenCalled();
        });
      });

      describe("and the chain is valid", () => {
        beforeEach(() => {
          blockchain.replaceChain(newchain.chain);
        });
        it("does replace chian", () => {
          expect(blockchain.chain).toEqual(newchain.chain);
        });

        it("logs chain", () => {
          expect(logMock).toHaveBeenCalled();
        });
      });
    });
  });
});
