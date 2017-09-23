let express = require('express');
let app = express();

let io = require('socket.io').listen(app.listen(8080));

var people = {};

io.sockets.on('connection', function (socket) {

    people[socket.handshake.query.name] = socket.id;

    console.log(people);

    socket.on('send', function (destinatario, msg) {
        io.to(people[destinatario]).emit('message', msg);
    });

});