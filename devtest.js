const Blockchain = require('./blockchain/blockchain')

function testPoW(){
const blockchain = new Blockchain();

for (let block_num = 0; block_num < 10; block_num++){
    console.log(blockchain.addBlock(`data ${block_num}`).toString());
}
}

testPoW();