const Block = require('./block')

const testBlock = Block.mineBlock(Block.genesis(), 'testBlock');
console.log(testBlock.toString());