// Basic socket import
const socketio = require('socket.io');
// Techs array parsing into a string
const parseStringAsArray = require('./utils/parseStringAsArray');
// To calculate user's distance radius
const calculateDistance = require('./utils/calculateDistance');

// Input-Output
let io;
// Array for palliatively storing user connections ("cache" system without a database for that)
const connections = [];

// Function to setup the websocket for real-time updating the application
exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        const { latitude, longitude, techs } = (socket.handshake.query);

        // New connection on the array
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

// Function to filter connections based on user's radius distance
exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item))
    })
}

// Function to send messages to all connections
exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}