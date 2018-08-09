const ChainUtil = require('../chain-util');

class Transaction{
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    static newTransaction(senderWallet, recipientAddress, amount){
        //returns a new instance of the Transaction class with appropriate outputs

        const transaction = new this();

        if (amount > senderWallet.balance){
            console.log(`Cannot prepare a transaction, Amount: ${amount} exceeds wallet balance.`);
            return;
        }

        transaction.outputs.push(...[  
            { amount, address: recipientAddress },
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey }
    
        ]);
        //...  is ES6 spread syntax that allows an iterable such as an array expression 
        //or string to be expanded in places where zero or more arguments (for function calls)
    
        return transaction;
    }
}

module.exports = Transaction;