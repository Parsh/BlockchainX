const Transaction = require('./transaction');
const Wallet = require('./index');

describe("Transaction", () => {
    let transaction, wallet, recipientAddress, amount;

    beforeEach(() => {      //provides every unit test (it) with a fresh transaction object
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

    it("should validate a valid transaction", () => {
        expect(Transaction.verifyTransaction(transaction)).toBe(true);
    });

    it("should invalidate a corrupt transaction", () => {
        transaction.outputs[0].amount = 40000; //corrupting the transaction 
        expect(Transaction.verifyTransaction(transaction)).toBe(false);
    });

    describe("Transacting with an amount that exceeds the balance", () => {
    
        beforeEach(()=>{ 
            amount = 5000;
            transaction = Transaction.newTransaction(wallet, recipientAddress, amount);
        });
    
        it("should not create the transaction", () => {
            expect(transaction).toEqual(undefined);
        });
    
    });

    describe("Updating Transaction", () => {
        let nextAmount, nextRecipient;
    
        beforeEach(()=>{
            nextAmount = 20;
            nextRecipientAddress = "n3xt-4ddr355";
            transaction = transaction.update(wallet, nextRecipientAddress, nextAmount);
        });
    
        it(`should substract the next amount from the sender's output`, () => { 
            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                .toEqual(wallet.balance - amount - nextAmount);
        });
    
        it('should contain an output with appropriate ammount for the next recipient', () => {
            expect(transaction.outputs.find(output => output.address === nextRecipientAddress).amount)
                .toEqual(nextAmount);
        });
    });

});



