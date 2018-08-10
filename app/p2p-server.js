const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5000;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const MESSAGE_TYPES = {
    blockchain : "BLOCKCHAIN",
    transaction: "TRANSACTION",
    clear_transactions: "CLEAR_TRANSACTIONS"
}


class P2pServer{
    constructor(blockchain, transactionPool){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.sockets = [];
    }

    listen(){
        //Brings up the P2P Server on the specified port, sets up a lister and connects to peer

        const server = new Websocket.Server({port: P2P_PORT});
        
        //setup an event lister, listening for connection events that arises whenever a peer
        //sends in a socket connection request
        server.on('connection', (socket) => { 
            this.socketConnected(socket);
        });
        
        this.connectToPeers();
        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
    }


    connectToPeers(){
        //connects to the peers specified in the PEERS env variable

        peers.forEach((peer) => {
            //the peer address looks like the following ws://localhost:5001
            const socket = new Websocket(peer);
            
            //Now rather than directly connecting to these supplied peer sockets, what we do is
            //we setup an open listner to these peer sockets because some of the supplied peers 
            //might not be up at the moment, so once they spawn(open) we connect to them. 
            socket.on('open', () => {
                this.socketConnected(socket);
            });   
        });
    }

    socketConnected(socket){
        //registers the connected socket and invokes the message handler

        this.sockets.push(socket);
        console.log("Socket Connected");
        this.messageHandler(socket);
        this.sendChain(socket);
    }
    
    messageHandler(socket){
        //sets up a message event listener, on a supplied socket, triggered by a socket.send function

        socket.on('message', message => {
            const data = JSON.parse(message);
            
            switch(data.type){
                case MESSAGE_TYPES.blockchain:
                    this.blockchain.replaceChain(data.blockchain);
                    break;
                case MESSAGE_TYPES.transaction:
                    this.transactionPool.updateOrAddTransaction(data.transaction);
                    console.log("Recieved: Transaction")
                    break;
                case MESSAGE_TYPES.clear_transactions:
                    this.transactionPool.clear();
                    break;
            }

        });
    }

    sendChain(socket){
        //sends the blockchain to the supplied peer socket

        socket.send(JSON.stringify({ 
            type: MESSAGE_TYPES.blockchain, 
            blockchain: this.blockchain.chain
        })); 
    }

    sendTransaction(socket, transaction){
        //send the trransaction to the supplied socket

        socket.send(JSON.stringify({
            type: MESSAGE_TYPES.transaction,
            transaction
        }));
    }

    syncChain(){
        //synchronizes blockchain b/w peers by sharing

        this.sockets.forEach((socket) => {
            this.sendChain(socket);
        });
    }

    broadcastTransaction(transaction){
        //broadcasts the transaction to all the connected peers

        this.sockets.forEach(socket => this.sendTransaction(socket, transaction));
    }

    broadcastClearTransaction(){
        //broadcasts clear transaction message, via sockets, to all the connected peers

        this.sockets.forEach(socket => socket.send(JSON.stringify({
            type: MESSAGE_TYPES.clear_transactions
        })));
    }

}

module.exports = P2pServer;


//we can use the following command to configure the ports and supply peers to instances
//beyond the 1st instannce (which uses the default ports) 
//$ HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5000,ws://localhost:5002 npm start