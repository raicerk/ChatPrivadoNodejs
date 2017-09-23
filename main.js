let express = require('express');
let app = express();

let io = require('socket.io').listen(app.listen(8080));

var people = {};

io.sockets.on('connection', function (socket) {

    people[socket.handshake.query.name] = socket.id;

    io.emit('lista',people);

    socket.on('send', function (destinatario, msg) {
        io.to(people[destinatario]).emit('message', msg);
    });

    console.log('--------------------------------');
    console.log(people);
    console.log('--------------------------------');

});