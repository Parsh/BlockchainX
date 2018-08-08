const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(timestamp, prevHash, hash, data){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
    }

    toString(){
        
        return `Block --
        Timestamp             : ${this.timestamp}
        Previous Block's Hash : ${this.prevHash}
        Current Block's Hash  : ${this.hash}
        Block's Data          : ${this.data} `;
    }

    static genesis(){
        //create and returns a genesis block (typically hardcoded with dummy values) 

        return new this('Genesis Time', '-------', 'gen321nm98m2aek', []);
    }

    static mineBlock(prevBlock, data){
        //mines(creates) a block 

        const timestamp = Date.now();
        const prevHash = prevBlock.hash;
        const hash = Block.createHash(timestamp, prevHash, data);

        return new this(timestamp, prevHash, hash, data);
    }

    static createHash(timestamp, prevHash, data){
        //generates and returns a SHA256 digest

       return SHA256(`${timestamp}${prevHash}${data}`).toString();
    }

    static blockHash(block){
        //calculates the hash for a supplied block

        // const timestamp = block.timestamp;
        // const prevHash = block.prevHash;
        // const data = block.data; 
        //(Following is an ES6 short hand for the above assignments)
        const {timestamp, prevHash, data} = block; //corresponding attribute values are assigned
        
        return Block.createHash(timestamp, prevHash, data);
    }
}

module.exports = Block;