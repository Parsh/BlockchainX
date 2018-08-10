const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');
const Blockchain = require('../blockchain/blockchain');
const { INITIAL_BALANCE } = require('../config');

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

    describe('calculating the balance', () => {
        let addBalance, repeatAdd, senderWallet, recipientWallet;

        beforeEach(() => {
            recipientWallet = wallet; //re-using the wallet defined above as the recipient
            senderWallet = new Wallet(); 
            addBalance = 100;
            repeatAdd = 3;

            for (let i = 0; i < repeatAdd ; i++){
                senderWallet.createTransaction(recipientWallet.publicKey, addBalance, blockchain, transactionPool);
            }
            blockchain.addBlock(transactionPool.transactions);//adding the above created transactions into the blockchain
        });

        it(`should calculate the balance from blockchain transactions where recipient address is the recipientWallet's address (publicKey)`, () => {
            expect(recipientWallet.calculateBalance(blockchain)).toEqual(INITIAL_BALANCE + (addBalance * repeatAdd));
        });

        it(`should calculate the balance from blockchain transactions where recipient address is the senderWallet's address (publicKey)`, () => {
            expect(senderWallet.calculateBalance(blockchain)).toEqual(INITIAL_BALANCE - (addBalance * repeatAdd));
        });

        describe('the recipientWallet conducts a transaction', () => {
            let subtractBalance, recipientBalance;

            beforeEach(() => {
                transactionPool.clear();
                subtractBalance = 60;
                recipientBalance = recipientWallet.calculateBalance(blockchain);
                wallet.createTransaction(senderWallet.publicKey, subtractBalance, blockchain, transactionPool);
                blockchain.addBlock(transactionPool.transactions);
            });

            describe('and the senderWallet sends another transaction to the recipientWallet', () => {

                beforeEach( ()=>{
                    transactionPool.clear();
                    senderWallet.createTransaction(recipientWallet.publicKey, addBalance, blockchain, transactionPool);
                    blockchain.addBlock(transactionPool.transactions);
                });

                it(`should calculate the recipientWallet balance only using transactions since the recipientWallet's most recent transaction`, () => {
                    expect(recipientWallet.calculateBalance(blockchain)).toEqual(recipientBalance - subtractBalance + addBalance);
                });
            });

        });

    });

});
