let express = require('express');
let app = express();
let db = require('./db');
let config = require('./config');

app.use(express.static('html'));

let io = require('socket.io').listen(app.listen(config.puerto, function () {
    console.log('chat ejecutandose');
    console.log('html estatico ejecutandose');
}));

var people = {};

io.sockets.on('connection', function (socket) {

    var nombre = socket.handshake.query.name;

    people[nombre] = socket.id;

    io.emit('lista', people);
    io.emit('CantidadConectados',Object.keys(people).length);

    socket.on('send', function (destinatario, msg) {
        io.to(people[destinatario]).emit('message', msg);
        db.query(nombre, destinatario, msg);
    });

    socket.on('disconnect', function () {
        console.log(`Se desconecto ${nombre}`);
        delete people[nombre];
        io.emit('lista', people);
        io.emit('CantidadConectados',Object.keys(people).length);
    });

    console.log('--------------------------------');
    console.log(people);
    console.log('--------------------------------');

});

