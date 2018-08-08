const Block = require('./block')
const Blockchain = require('./blockchain')

// const testBlock = Block.mineBlock(Block.genesis(), 'testBlock');
// console.log(testBlock.toString());

bc = new Blockchain();
bc.addBlock('dummy');

bc1 = new Blockchain();
bc1.addBlock('dummy');

console.log(bc.chain[0])

console.log(bc.isValidChain(bc1));