const socketIo = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    //console.log("Teste Rodando" + server.id);
    io = socketIo(server);

    //console.log("IO:" + io.id);

    //sempre que o user conectar via socket...
    io.on("connection" , socket => {
        //console.log("SocketId:" + socket.id);
        //console.log("Socket Query:" + socket.handshake.query); //parametros

        /*setTimeout(() => {
            socket.emit('message' , 'Hello OmminiStack');
        }, 3000);*/

        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
    });
};

exports.findConnections = (coordinates, tech) => {
    return connections.filter(connection => {
        //Comparando coordanadas do novo Dev cadastrado
        //com as coordenadas armazenadas nas connections...
        //Tem que ter ao menos uma tecnologia ...
        return calculateDistance(coordinates, connection.coordinates) < 10
        && connection.techs.some(item => techs.includes(item));
    });
};

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });
};