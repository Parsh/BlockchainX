const Transaction = require('./transaction');

class TransactionPool{
    constructor(){
        this.transactions = [];
    }

    updateOrAddTransaction(transaction){
        //adds or updates the supplied transaction into the Transaction Pool.

        //Note: there is a possibility that a transaction could come in that is already there in the pool(i.e with 
        //same) because we have provided the functionality to update transactions (and include more outputs), 
        //so if a transaction is updated and it make it to the pool, then we don't want it to appear as a seperate
        //transaction, rather we would update it in the pool aswell. 
    
        let transactionWithSameId = this.transactions.find(t => t.id === transaction.id);
        if (transactionWithSameId){
            this.transactions[this.transactions.indexOf(transactionWithSameId)] = transaction;
        } else {
            this.transactions.push(transaction);
        }
    }

    existingTransaction(address){
        return this.transactions.find(t => t.input.address === address);
    }

    validTransactions(){
        return this.transactions.filter(transaction => {
           
            const outputTotal = transaction.outputs.reduce((total, output) =>{
                return total = total + output.amount;
            }, 0);
            
            
            if(transaction.input.amount !== outputTotal){
                console.log(`Invalid transaction from ${transaction.input.address}.`);
                return;
            }

            if(!Transaction.verifyTransaction(transaction)){
                console.log(`Invalid signature from ${transaction.input.address}`);
                return;
            }

            return transaction;
        });
    }

    clear(){
        this.transactions = [];
    }

}

module.exports = TransactionPool;