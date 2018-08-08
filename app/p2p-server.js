const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5000;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer{
    constructor(blockchain){
        this.blockchain = blockchain;
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
        socket.send(JSON.stringify(this.blockchain.chain)); //sends the blockchain to connected sockets
    }
    
    messageHandler(socket){
        //sets up a message event listener, on a supplied socket, triggered by a socket.send function

        socket.on('message', message => {
            const data = JSON.parse(message);
            console.log(`Data: ${message}`);
        });
    }

}

module.exports = P2pServer;


//we can use the following command to configure the ports and supply peers to instances
//beyond the 1st instannce (which uses the default ports) 
//$ HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5000,ws://localhost:5002 npm start