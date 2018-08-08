const Block = require('./block')
const Blockchain = require('./blockchain')

// const testBlock = Block.mineBlock(Block.genesis(), 'testBlock');
// console.log(testBlock.toString());

bc = new Blockchain();

bc1 = new Blockchain();
bc1.addBlock('dummy');

bc.replaceChain(bc1.chain)

console.log(bc.chain == bc1.chain)
console.log(bc.chain)