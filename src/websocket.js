const socketIo = require('socket.io');

let io;

exports.setupWebsocket = (server) => {
    console.log("Teste Rodando" + server.id);
    io = socketIo(server);

    console.log("IO:" + io.id);

    //sempre que o user conectar via socket...
    io.on("connection" , socket => {
        
        console.log("SocketId:" + socket.id);
        console.log("Socket Query:" + socket.handshake.query); //parametros

        setTimeout(() => {
            socket.emit('message' , 'Hello OmminiStack');
        }, 3000);
    });
};