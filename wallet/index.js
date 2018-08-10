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

    calculateBalance(blockchain){
        //calculates the current balance of the wallet

        let balance = this.balance;
        let transactions = [];

         //collecting all the transactions from the blockchain into a single array
        blockchain.chain.forEach(block => block.data.forEach(transaction => {
            transactions.push(transaction); 
        }));

        //from the array of all transactions, capture only those transactions that were initiated by this wallet
        const walletInputs = transactions.filter(transactions => transactions.input.address === this.publicKey);
        
        let startTime = 0;

        //find the most recent transaction by this wallet using the timestamp
       if(walletInputs.length > 0){ //JS reduce fxn cann't reduce an array that's empty, hence we check
            const recentInputTransaction = walletInputs.reduce(
                (prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current
            );

            //assign the current balance to be equal to the recent transaction's change 
            balance = recentInputTransaction.outputs.find(output => output.address === this.publicKey).amount;
        
            startTime = recentInputTransaction.input.timestamp; //time of the most recent transaction from the wallet
        }

        //for all the transactions that occured after the recent transaction from this wallet, check whether they
        //contain an output with an address equal to this wallet's publicKey(address), if so, then add the output's
        //amount to the wallet's balance
        transactions.forEach(transaction =>  {
            if(transaction.input.timestamp > startTime){
                transaction.outputs.find(output => {
                    if(output.address === this.publicKey){
                        balance += output.amount;
                    }
                })
            }
        });    
    }

    static blockchainWallet(){
        //generates an instance of the special blockchain wallet

        const blockchainWallet = new this();
        blockchainWallet.publicKey = "blockchain-wallet"; //special public-key(address) that implies that this is 
                                                          //the blockchain wallet
        return blockchainWallet;
    }

}

module.exports = Wallet;