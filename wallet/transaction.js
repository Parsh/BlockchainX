const ChainUtil = require('../chain-util');

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

    static newTransaction(senderWallet, recipientAddress, amount){
        //returns a new instance of the Transaction class with appropriate inputs and outputs

        const transaction = new this();

        if (amount > senderWallet.balance){
            console.log(`Cannot prepare the transaction, Amount: ${amount} exceeds wallet balance.`);
            return;
        }

        transaction.outputs.push(...[  
            { amount, address: recipientAddress },
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey }
    
        ]);
        //...  is ES6 spread syntax that allows an iterable such as an array expression 
        //or string to be expanded in places where zero or more arguments (for function calls)
        
        Transaction.signTransaction(transaction, senderWallet);

        return transaction;
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