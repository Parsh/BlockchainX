const { DIFFICULTY, MINE_RATE } = require('../config');
const ChainUtil = require('../chain-util');

class Block{
    constructor(timestamp, prevHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString(){
        
        return `Block --
        Timestamp             : ${this.timestamp}
        Previous Block's Hash : ${this.prevHash}
        Current Block's Hash  : ${this.hash}
        Nonce                 : ${this.nonce}
        Difficulty            : ${this.difficulty}
        Block's Data          : ${this.data} `; 
    }

    static genesis(){
        //create and returns a genesis block (typically hardcoded with dummy values) 

        return new this('Genesis Time', '-------', 'gen321nm98m2aek', [], 0);
    }

    static mineBlock(prevBlock, data){
        //mines(generates) a block 

        let prevHash = prevBlock.hash;
        let {difficulty} = prevBlock; //ES6 distruction syntax: assigns corresponding key's value from the object to the variable
        let hash, timestamp;
        let nonce = 0;
    
        
        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(prevBlock, timestamp);
            hash = Block.createHash(timestamp, prevHash, data, nonce, difficulty);
        }while(hash.substring(0, difficulty) !== "0".repeat(difficulty));

        return new this(timestamp, prevHash, hash, data, nonce, difficulty);
    }

    static createHash(timestamp, prevHash, data, nonce, difficulty){
        //generates and returns a SHA256 digest

       return ChainUtil.hash(`${timestamp}${prevHash}${data}${nonce}${difficulty}`);
    }

    static blockHash(block){
        //calculates the hash for a supplied block

        // const timestamp = block.timestamp;
        // const prevHash = block.prevHash;
        // const data = block.data; 
        //(Following is an ES6 short hand for the above assignments)
        const {timestamp, prevHash, data, nonce, difficulty} = block; //corresponding attribute values are assigned
        return Block.createHash(timestamp, prevHash, data, nonce, difficulty);
    }

    static adjustDifficulty(prevBlock, currentTime){
        let { difficulty } = prevBlock;
    
        difficulty = prevBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }

}

module.exports = Block;