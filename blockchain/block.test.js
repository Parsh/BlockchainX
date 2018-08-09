const Block = require('./block');
const DIFFICULTY = require('../config');

describe("Block", ()=> {
    let data, lastBlock, block;

    beforeEach(() => {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    it('should set the `data` to match the input', () => {
        expect(block.data).toEqual('bar');
    });

    it('should the `prev hash` to match the hash of the last block', () => {
        expect(block.prevHash).toEqual(lastBlock.hash);
    });

    it('should generate a hash that matches the difficulty', () => {
        expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));
        console.log("done");
    });
});