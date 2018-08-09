const Blockchain = require('./blockchain/blockchain');
const Wallet = require('./wallet');


function testPoW(){
    const blockchain = new Blockchain();

    for (let block_num = 0; block_num < 10; block_num++){
        console.log(blockchain.addBlock(`data ${block_num}`).toString());
    }
}

//testPoW();

var wallet = new Wallet();
console.log(wallet.toString());