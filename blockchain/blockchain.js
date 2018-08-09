const Block = require('./block');

class Blockchain{
    constructor(){
        //initializes the blockchain with a genesis block
        
        this.chain = [Block.genesis()];
    }

    addBlock(data){
        //add a block, with the provided data, to the blockchain

        const prevBlock = this.chain[this.chain.length-1];
        const block = Block.mineBlock(prevBlock, data);
        this.chain.push(block);

        return block;
    }

    isValidChain(chainx){
        //checks whether the supplied chain is valid

        if (JSON.stringify(chainx[0]) !== JSON.stringify(Block.genesis())) return false;
        
        for (let blockNum =1; blockNum < chainx.length; blockNum++){
            const currentBlock = chainx[blockNum];
            const prevBlock = chainx[blockNum - 1];

            if (currentBlock.prevHash !== prevBlock.hash ||
                currentBlock.hash !== Block.blockHash(currentBlock)){
                return false;
            }
        }
        return true;
    }

    replaceChain(newChain){
        //replaces the current blockchain with a new valid and longer blockchain
        console.log("Recieved a blockchain");
        if (newChain.length <= this.chain.length){
            console.log("Not Replacing: Supplied chain isn't longer(less or equal PoW) than the current chain");
        } else if (!this.isValidChain(newChain)){
            console.log("Not Replacing: The recieved chain isn't valid");
        } else {
            console.log("Replacing the current blockchain with the one recieved #Long&Valid");
            this.chain = newChain;
        }
    }
}

module.exports = Blockchain;