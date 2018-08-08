const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain/blockchain');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3000;

const app = express();
const blockchain = new Blockchain();
const p2pServer = new P2pServer(blockchain);

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("<h1>Welcome To BlockchainX<h1>")
});

app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

app.post('/mine', (req, res) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added\n${block.toString()}`)
    res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => {
    console.log(`Server up and listening at ${HTTP_PORT}`)
});

p2pServer.listen();