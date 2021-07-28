const express = require("express");
const app = express();
const Server = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const ioServer = new Server(expressServer);

//`ioServer.on` is the equivalent to `io.of('/').on`.  if you don't specify a namespace the default will be '/'.
ioServer.on("connection", (socket) => {
  socket.emit("messageFromServer", { data: "Welcome to the socketio server" });
  socket.on("messageToServer", (dataFromClient) => {
    console.log(dataFromClient);
  });
  socket.join('level1')
  socket.to('level1').emit('joined', `${socket.id} says I have joined the level 1 room!`)
});

ioServer.of("/admin").on("connection", (socket) => {
  console.log("Someone connected to the admin namespace!");
  ioServer.of("/admin").emit("welcome", "Welcome to the admin channel!");
});
