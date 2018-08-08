const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain/blockchain');

const HTTP_PORT = process.env.PORT || 3000;

const app = express();
const blockchain = new Blockchain();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("<h1>Welcome To BlockchainX<h1>")
});

app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

app.post('/mine', (req, res) => {
    console.log(req)
    const block = blockchain.addBlock(req.body.data);
    console.log(`New blocks added ${block.toString()}`)
    res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => {
    console.log(`Server up and listening at ${HTTP_PORT}`)
});
