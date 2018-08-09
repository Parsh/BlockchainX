const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); //there are multiple implementations of elliptic curve algorithm, however,
                                //we are going to use the one that's used by Bitcoin: secp256k1, where sec stands for
                                //standards of efficient cryptography, p256 represents prime of 256 bits (32 bytes),
                                // k is the intial of a notable mathematician koblet in the field of cryptography
                                // 1 stands for this being the first implementation of the algorithm in this standard 

class ChainUtil{

    static genKeyPair(){
        return ec.genKeyPair();
    }

}

module.exports = ChainUtil;