const ChainUtil = require('../chain-util');
const { INITIAL_BALANCE } = require('../config');

class Wallet {
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString(){
        return `Wallet --
        publicKey : ${this.publicKey.toString()}
        balance   : ${this.balance}`
    }

    sing(dataHash){
        //signs the hash of the data using the wallet owner's private key

        return this.keyPair.sing(dataHash);
    }
}

module.exports = Wallet;