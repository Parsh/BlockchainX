const Blockchain = require('./blockchain');
const Block = require('./block')

describe('Blockchain', () => {

    let blockchain, blockchain2; 
    
    beforeEach(() => {
        blockchain = new Blockchain();
        blockchain2 = new Blockchain();
    });

    it('should start witht the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('should add a new block', () => {
        const data = 'dummy';
        blockchain.addBlock(data);

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
    });

    it('should validate a valid chain', () => {
        blockchain2.addBlock('dummy'); //supplying the same data such that blockhain2 = blockchain
        
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
    });

    it('should invalidate a chain with corrupt genesis block', () => {
        blockchain2.chain[0].data = 'Corrupt data';
        
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false); 
    });

    it('should invalidate a chain with a corrupt block', () => {
        blockchain2.addBlock('foo');
        blockchain2.chain[1].data = 'Corrupt foo';

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    it('should replace the current chain with valid chain', () => {
        blockchain2.addBlock('batmobile'); //adding a block to valid blockchain2, thereby making it longer than blockchain 1
        blockchain.replaceChain(blockchain2.chain);

        expect(blockchain.chain).toEqual(blockchain2.chain);
    });

    it("should not replace the current chain with the one who's length is less that or equal to the current chain", () => {
        blockchain.addBlock('picka');
        blockchain.replaceChain(blockchain2.chain);

        expect(blockchain.chain).not.toEqual(blockchain2.chain);
    });

});