const Blockchain = require('./blockchain/blockchain');
const Wallet = require('./wallet');
const Transaction = require('./wallet/transaction')


function testPoW(){
    const blockchain = new Blockchain();

    for (let block_num = 0; block_num < 10; block_num++){
        console.log(blockchain.addBlock(`data ${block_num}`).toString());
    }
}

//testPoW();

wallet = new Wallet();
amount = 50;
recipientAddress = "r3c1p13nt";
transaction = Transaction.newTransaction(wallet, recipientAddress, amount);
console.log(transaction);
console.log(transaction.outputs.find(output => output.address === recipientAddress).amount);

console.log(transaction.outputs.find(output => output.address === wallet.publicKey).amount === wallet.balance - amount);
