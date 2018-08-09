const Block = require('./block');
const DIFFICULTY = require('../config');

describe("Block", ()=> {
    let data, lastBlock, block;

    beforeEach(() => {
        data = 'bar';
        prevBlock = Block.genesis();
        block = Block.mineBlock(prevBlock, data);
    });

    it('should set the `data` to match the input', () => {
        expect(block.data).toEqual('bar');
    });

    it('should the `prev hash` to match the hash of the last block', () => {
        expect(block.prevHash).toEqual(prevBlock.hash);
    });

    it('should generate a hash that matches the difficulty', () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });

    it('should lower the difficulty for slowly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 5000)).toEqual(block.difficulty -1);
    });
});