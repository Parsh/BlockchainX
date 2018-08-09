const Block = require('./blockchain/block')
const Blockchain = require('./blockchain/blockchain')

// const testBlock = Block.mineBlock(Block.genesis(), 'testBlock');
// console.log(testBlock.toString());

bc = new Blockchain();

bc1 = new Blockchain();
bc1.addBlock('dummy');

data = 'bar';
prevBlock = Block.genesis();
block = Block.mineBlock(prevBlock, data);

console.log(Block.adjustDifficulty(block, block.timestamp + 5000) == (block.difficulty -1));