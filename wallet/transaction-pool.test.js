const TransactionPool = require("./transaction-pool");
const Transaction = require("./transaction");
const Wallet = require("./index");

describe("Transaction Pool", () => {
    let transactionPool, transaction, wallet;

    beforeEach(() => {
        transactionPool = new TransactionPool();
        wallet = new Wallet();
        transaction = Transaction.newTransaction(wallet, 'random-address456', 30);
        transactionPool.updateOrAddTransaction(transaction);
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

});