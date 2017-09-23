let express = require('express');
let app = express();

let io = require('socket.io').listen(app.listen(8080));

// io.sockets.on('connection', function (socket) {
//     socket.emit('message', { datos: 'He recibido estos datos desde el servidor' });
//     socket.on('send', function (data) {
//         io.sockets.emit('message', {datos: data});
//     });
// });

io.sockets.on('connection', function (socket) {

    socket.on('new_message', function(data) {
        console.log(data);
        socket.device_id = data.device_id;
        socket.agent_id = data.agent_id;
        socket.broadcast.to(socket.devide_id).emit('my message', 'holowows');
    });

});