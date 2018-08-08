const Block = require('./block');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data){
        //add a block, with the provided data, to the blockchain

        const prevBlock = this.chain[this.chain.length-1];
        const block = Block.mineBlock(prevBlock, data);
        this.chain.push(block);

        return block;
    }

    isChainValid(chainx){
        //checks whether the supplied chain is valid

        if (JSON.stringify(chainx[0]) !== JSON.stringify(Block.genesis())) return false;

        for (let blockNum =1; blockNum < chian.length; blockNum++){
            const currentBlock = chainx[blockNum];
            const prevBlock = chainx[blockNum - 1];

            if (currentBlock.prevHash !== prevBlock.hash ||
                block.hash !== Block.blockHash(block)){
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;