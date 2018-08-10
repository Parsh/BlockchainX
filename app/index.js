const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain/blockchain');
const P2pServer = require('./p2p-server');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');

const HTTP_PORT = process.env.HTTP_PORT || 3000;

const app = express();

const blockchain = new Blockchain();
const wallet = new Wallet();
const transactionPool = new TransactionPool();
const p2pServer = new P2pServer(blockchain, transactionPool);

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("<h1>Welcome To BlockchainX<h1>")
});

app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

app.get('/transactions', (req, res) => {
    res.json(transactionPool.transactions);
});

app.get('/public-key', (req, res) => {
    res.json({
        publicKey: wallet.publicKey
    });
});

app.post('/mine', (req, res) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added\n${block.toString()}`)
 
    p2pServer.syncChain();
 
    res.redirect('/blocks');
});

app.post('/transact', (req, res) => {
    const { recipient, amount } = req.body;
    const transaction = wallet.createTransaction(recipient, amount, transactionPool);
    p2pServer.broadcastTransaction(transaction);
    res.redirect('/transactions');
});

app.listen(HTTP_PORT, () => {
    console.log(`Server up and listening at ${HTTP_PORT}`)
});

p2pServer.listen();