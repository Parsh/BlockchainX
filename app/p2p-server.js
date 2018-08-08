const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5000;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer{
    constructor(blockchain){
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen(){
        const server = new Websocket.Server({port: P2P_PORT});
        server.on('connection', (socket) => {  //event lister, listening for connection event
            this.connectSocket(socket);
        });
        
        this.connectToPeers();
        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
    }

    connectSocket(socket){
        this.sockets.push(socket);
        console.log("Socket Connected");
    }

    connectToPeers(){
        peers.forEach((peer) => {
            //the peer address looks like the following ws://localhost:5001
            const socket = new Websocket(peer);
            socket.on('open', () => this.connectSocket(socket));    
        });
    }

}

module.exports = P2pServer;



//we can use such a command to configure the ports and supply peers for our server
//HTTP_PORT = 3000 P2P_PORT=5000 PEERS=ws://localhost:5001,ws://localhost5002 npm run dev