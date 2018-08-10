const ChainUtil = require('../chain-util');
const { MINING_REWARD } = require('../config');

class Transaction{
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    update(senderWallet, recipientAddress, amount){
        //allows a transaction to incorpoarate more outputs that might be intended for some other recipient
        //thereby enabling multiple entity payment mechanism.

        //find the output from the original transaction that corresponds to the sender itself (change)
        const senderOuptput = this.outputs.find(output => output.address === senderWallet.publicKey);

        if(amount > senderOuptput.amount){
            console.log(`Cannot update the transaction, Amount: ${amount} exceeds wallet balance.`);
            return;
        }

        //the output object who's address corresponds to the sender's address in the outputs array gets updated 
        //because Javascript employs pass-by-refference mechanism, thereby the following statemend would update it
        senderOuptput.amount = senderOuptput.amount - amount; 

        this.outputs.push({amount, address: recipientAddress});
        Transaction.signTransaction(this, senderWallet);

        return this;

    }

    static transactionWithOutputs(senderWallet, outputs){
        //constructs a transaction with the help of the supplied outputs and sender's wallet

        const transaction = new this();
        transaction.outputs.push(...outputs);  
        //...  is ES6 spread syntax that allows an iterable such as an array expression 
        //or string to be expanded in places where zero or more arguments (for function calls)

        Transaction.signTransaction(transaction, senderWallet);
        return transaction;
    }

    static newTransaction(senderWallet, recipientAddress, amount){
        //returns a new instance of the Transaction class with appropriate inputs and outputs

        if (amount > senderWallet.balance){
            console.log(`Cannot prepare the transaction, Amount: ${amount} exceeds wallet balance.`);
            return;
        }

        //construct the output and change(back to the sender) output
        var outputs = [  
            { amount, address: recipientAddress },
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey }
        ]
      
        return Transaction.transactionWithOutputs(senderWallet, outputs);
    }

    static rewardTransaction(minerWallet, blockchainWallet){
        //generates a coinbase/reward transaction

        //blockchain wallet: a special wallet that generate signatures in order to confirm and authenticate 
        // reward transactions, therefore, the blockchain implementation itself is the one responsible for 
        //approving the reward. This special transaction is also referred to as the coinbase transaction.

        var outputs = [
            {amount: MINING_REWARD, address: minerWallet.publicKey}
        ]

        return Transaction.transactionWithOutputs(blockchainWallet, outputs)
    }

    static signTransaction(transaction, senderWallet){
        // creates transaction input and signs the hash of the output of the transaction

        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
        };
    }

    static verifyTransaction(transaction){
        //verifies a transaction

        return ChainUtil.verifySignature(
            transaction.input.address,
            transaction.input.signature,
            ChainUtil.hash(transaction.outputs)
        );
    }
}

module.exports = Transaction;