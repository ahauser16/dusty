const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);

// see section VI of README in socketioFolder
const io = new socketio(expressServer,{
  path: '/socket.io', //default value so not necessary
  serveClient: true   //default value so not necessary
});

io.on("connection", (socket) => {
  socket.emit("messageFromServer", { data: "Welcome to the socketio server" });
  socket.on("messageToServer", (dataFromClient) => {
    console.log(dataFromClient);
  });
});
