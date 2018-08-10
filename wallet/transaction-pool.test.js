const TransactionPool = require("./transaction-pool");
const Transaction = require("./transaction");
const Wallet = require("./index");
const Blockchain = require('../blockchain/blockchain');

describe("Transaction Pool", () => {
    let transactionPool, transaction, wallet;

    beforeEach(() => {
        transactionPool = new TransactionPool();
        wallet = new Wallet();
        blockchain = new Blockchain();
        transaction = wallet.createTransaction('random-address456', 30, blockchain, transactionPool);
    });

    it('should add the transaction to the pool', () => {
        expect(transactionPool.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
    });

    it('should update a transaction in the pool', () => {
        let oldTransaction = JSON.stringify(transaction);
        const updatedTransaction = transaction.update(wallet, 'another-random-address123', 60);
        transactionPool.updateOrAddTransaction(updatedTransaction);
        
        expect(transactionPool.transactions.find(t => t.id === updatedTransaction.id))
            .not.toEqual(oldTransaction);
    });

    it('should clear transactions', () => {
        transactionPool.clear();
        expect(transactionPool.transactions).toEqual([]);
    });

    describe('mixing valid and corrupt transactions', () => {
        let validTransactions;

        beforeEach(() => {
            validTransactions = [...transactionPool.transactions]; //at the moment, we know that the pool only has valid
                                                                   //transactions, so we unfold them in validTransactions
            //Lets create some valid and corrupt transactions for the pool
            for (i = 0; i < 6; i++){
                wallet = new Wallet();
                transaction = wallet.createTransaction(`random_address${i}99`, 30, blockchain, transactionPool);
                
                if(i % 2 == 0){
                    transaction.input.amount = 999999; //corrupt the transaction
                } else {
                    validTransactions.push(transaction); //send valids to validTransaction
                }
            }
        });

        it('should show difference between valid and corrupt transactions', () => {
            expect(JSON.stringify(transactionPool.transactions)).not.toEqual(JSON.stringify(validTransactions));    
        });

        it('should grab valid transactions from the transaction pool', () => {
            expect(transactionPool.validTransactions()).toEqual(validTransactions);
        });
    });

});