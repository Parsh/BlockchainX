const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
const { INITIAL_BALANCE } = require('../config');

class Wallet {
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString(){
        return `Wallet --
        publicKey : ${this.publicKey.toString()}
        balance   : ${this.balance}`
    }

    sign(dataHash){
        //signs the hash of the data using the wallet owner's private key

        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient, amount, transactionPool){
        // creates or updates a transaction and sends it to the transactionPool

        if(amount > this.balance){
            cosnole.log(`Transaction not created, Amount: ${amount} exceeds current balance: ${this.balance}`);
            return
        }

        let transaction = transactionPool.existingTransaction(this.publicKey); 
        //checking whether there already exist a transaction in the pool from this wallet

        if(transaction){
            transaction.update(this, recipient, amount)
        } else {
            transaction = Transaction.newTransaction(this, recipient, amount);
        }

        transactionPool.updateOrAddTransaction(transaction);
        return transaction;

    }

}

module.exports = Wallet;