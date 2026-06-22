const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log(`A user connected with ID: ${socket.id}`);

    socket.on('chat message', (msg) => {
        console.log(`Message received from ${socket.id}: ${msg}`);
       
        io.emit('chat message', {
            id: socket.id,
            text: msg,
            timestamp: new Date()
        });
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`WhatsApp Clone server is running at http://localhost:${PORT}`);
});
