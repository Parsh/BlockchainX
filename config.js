const DIFFICULTY = 4;

const MINE_RATE = 3000; //rate in milliseconds at which the blocks should be mined

const INITIAL_BALANCE = 500; //though in the real world applications, wallets don't have any initial balance but
//in order to just get the economy going, at this small, scale we provide wallets with some balance to start with

const MINING_REWARD = 50; 

module.exports = { DIFFICULTY, MINE_RATE, INITIAL_BALANCE, MINING_REWARD };