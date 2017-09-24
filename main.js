let express = require('express');
let app = express();
let db = require('./db');

let io = require('socket.io').listen(app.listen(8080, function () {
    console.log('chat ejecutandose');
}));

var people = {};

io.sockets.on('connection', function (socket) {

    var nombre = socket.handshake.query.name;

    people[nombre] = socket.id;

    io.emit('lista', people);

    socket.on('send', function (destinatario, msg) {
        io.to(people[destinatario]).emit('message', msg);
        db.query(nombre, destinatario, msg);
    });

    socket.on('disconnect', function () {
        console.log(`Se desconecto ${nombre}`);
        delete people[nombre];
        io.emit('lista', people);
    });

    console.log('--------------------------------');
    console.log(people);
    console.log('--------------------------------');

});