const Block = require('./block');

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
});