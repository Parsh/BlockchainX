const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');

describe("Wallet", () => {

    let wallet, transactionPool;

    beforeEach(() => {
        wallet = new Wallet();
        transactionPool = new TransactionPool();
    });


    describe("creating a transaction", () => {

        let transaction, sendAmount, recipient;
    
        beforeEach(() => {
            sendAmount = 50;
            recipient = 'r4nd0m-4dr355';
            transaction = wallet.createTransaction(recipient, sendAmount, transactionPool);
        });
    
        describe(" and doing the same transaction", () => {
            beforeEach(() => {
                wallet.createTransaction(recipient, sendAmount, transactionPool);
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
