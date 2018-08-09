const Transaction = require('./transaction');
const Wallet = require('./index');

describe("Transaction", () => {
    let transaction, wallet, recipientAddress, amount;

    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipientAddress = "r3c1p13nt";
        transaction = Transaction.newTransaction(wallet, recipientAddress, amount);
    });

    it("should output the amount subtracted from wallet balance", () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);;
    });

    it("should output the amount send to recipient address", () => {
        expect(transaction.outputs.find(output => output.address === recipientAddress).amount)
        .toEqual(amount);
    });

    it("should include the input with an amount equal to wallet balance", () => {
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

});

describe("Transacting with an amount that exceeds the balance", () => {
    let transaction, wallet, recipientAddress, amount
    
    beforeEach(()=>{
        wallet = new Wallet();
        amount = 5000;
        recipientAddress = "r3c1p13nt";
        transaction = Transaction.newTransaction(wallet, recipientAddress, amount);
    });

    it("should not create the transaction", () => {
        expect(transaction).toEqual(undefined);
    });

});