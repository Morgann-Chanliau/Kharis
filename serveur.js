// server.js

const express = require('express');

const http = require('http');

const socketIo = require('socket.io');

const mongoose = require('mongoose');




const app = express();

const server = http.createServer(app);

const io = socketIo(server);




// Connexion à MongoDB

mongoose.connect('mongodb://localhost:27017/forum', { useNewUrlParser: true, useUnifiedTopology: true });




const messageSchema = new mongoose.Schema({

    text: String,

    createdAt: { type: Date, default: Date.now }

});




const Message = mongoose.model('Message', messageSchema);




// Middleware pour servir les fichiers statiques

app.use(express.static('public'));




// Routes

app.get('/messages', async (req, res) => {

    const messages = await Message.find().sort({ createdAt: -1 }).limit(10);

    res.json(messages);

});




// WebSockets

io.on('connection', (socket) => {

    console.log('Nouvel utilisateur connecté');




    socket.on('message', async (text) => {

        const message = new Message({ text });

        await message.save();

        io.emit('message', message);

    });

});




const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {

    console.log(`Serveur en écoute sur le port ${PORT}`);

});
