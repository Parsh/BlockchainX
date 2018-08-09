const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY } = require('../config');

class Block{
    constructor(timestamp, prevHash, hash, data, nonce){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    toString(){
        
        return `Block --
        Timestamp             : ${this.timestamp}
        Previous Block's Hash : ${this.prevHash}
        Current Block's Hash  : ${this.hash}
        Nonce                 : ${this.nonce}
        Block's Data          : ${this.data} `; 
    }

    static genesis(){
        //create and returns a genesis block (typically hardcoded with dummy values) 

        return new this('Genesis Time', '-------', 'gen321nm98m2aek', [], 0);
    }

    static mineBlock(prevBlock, data){
        //mines(generates) a block 

        const prevHash = prevBlock.hash;
        let nonce = 0;
        let hash, timestamp;
        console.time("Block in mined in");
        
        do{
            nonce++;
            timestamp = Date.now();
            hash = Block.createHash(timestamp, prevHash, data, nonce);
        }while(hash.substring(0, DIFFICULTY) !== "0".repeat(DIFFICULTY));

        console.timeEnd("Block is mined in")

        return new this(timestamp, prevHash, hash, data, nonce);
    }

    static createHash(timestamp, prevHash, data, nonce){
        //generates and returns a SHA256 digest

       return SHA256(`${timestamp}${prevHash}${data}${nonce}`).toString();
    }

    static blockHash(block){
        //calculates the hash for a supplied block

        // const timestamp = block.timestamp;
        // const prevHash = block.prevHash;
        // const data = block.data; 
        //(Following is an ES6 short hand for the above assignments)
        const {timestamp, prevHash, data, nonce} = block; //corresponding attribute values are assigned
        
        return Block.createHash(timestamp, prevHash, data, nonce);
    }
}

module.exports = Block;