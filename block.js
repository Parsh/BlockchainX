class Block{
    constructor(timestamp, prevHash, hash, data){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
    }

    toString(){
        //becuase the hashs are going to be quite long, we used the subString function
        //so as to log a concise, not to mention readable, output.
        return `Block --
        Timestamp             : ${this.timestamp}
        Previous Block's Hash : ${this.prevHash.substring(0, 10)}
        Current Block's Hash  : ${this.hash.substring(0, 10)}
        Block's Data          : ${this.data} `;
    }

    static genesis(){
        //genesis block, typically hardcoded with dummy values 
        return new this('Genesis Time', '-------', 'jf34nm98m2aek', []);
    }

}

module.exports = Block;