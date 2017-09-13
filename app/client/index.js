const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// nasłuchiwanie na połączenie

io.on('connection', function(socket) {

    // klient nasłuchuje na wiadomość wejścia do czatu
    socket.on('join', function(name){
        // użytkownika, który pojawił się w aplikacji zapisujemy do serwisu trzymającego listę osób w czacie
        userService.addUser({
            id: socket.id,
            name: name
        });
        // aplikacja emituje zdarzenie update, które aktualizuje informację na temat listy użytkowników każdemu nasłuchującemu na wydarzenie 'update'
        io.emit('update', {
            users: userService.getAllUsers()
        });
    });


});



server.listen(3000, function(){
    console.log('listening on *:3000');
});