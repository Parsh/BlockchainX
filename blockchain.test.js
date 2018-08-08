const Blockchain = require('./blockchain');
const Block = require('./block')

describe('Blockchain', () => {

    let blockchain; 
    
    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it('should start witht the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('should add a new block', () => {
        const data = 'dummy data';
        blockchain.addBlock(data);

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
    });

});