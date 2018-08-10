const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');
const Blockchain = require('../blockchain/blockchain')

describe("Wallet", () => {

    let wallet, transactionPool, blockchain;

    beforeEach(() => {
        wallet = new Wallet();
        transactionPool = new TransactionPool();
        blockchain = new Blockchain();
    });


    describe("creating a transaction", () => {

        let transaction, sendAmount, recipient;
    
        beforeEach(() => {
            sendAmount = 50;
            recipient = 'r4nd0m-4dr355';
            transaction = wallet.createTransaction(recipient, sendAmount, blockchain, transactionPool);
        });
    
        describe(" and doing the same transaction", () => {
            beforeEach(() => {
                wallet.createTransaction(recipient, sendAmount, blockchain,transactionPool);
            });

            it('should double the amount (sendAmount) subtracted from the wallet balance', () => {
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                    .toEqual(wallet.balance - sendAmount*2);
            });

            it('should clone the sendAmount output(contains two same amount outputs) for the recipient',() => {
                expect(transaction.outputs.filter(output => output.address === recipient)
                    .map(output => output.amount)).toEqual([sendAmount, sendAmount]);
            });

        });

    });

});
