const express = require("express");
const app = express();
const Server = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);

// see section VI of README in socketioFolder
const ioServer = new Server(expressServer, {
  path: "/socket.io", //default value so not necessary
  serveClient: true, //default value so not necessary
});

//`ioServer.on` is the equivalent to `io.of('/').on`.  if you don't specify a namespace the default will be '/'.
ioServer.on("connection", (socket) => {
  socket.emit("messageFromServer", { data: "Welcome to the socketio server" });
  socket.on("messageToServer", (dataFromClient) => {
    console.log(dataFromClient);
  });
  socket.on("newMessageToServer", (msg) => {
    // console.log(msg)
    // ioServer.emit('messageToClients',{text:msg.text})
    //below is the equivalent of the line of code directly above.
    ioServer.of("/").emit("messageToClients", { text: msg.text });
  });

  // The server can still communicate across namespaces
  // but on the client the socket needs to be in THAT namespace
  // in order to receive the EventSource.
  ioServer
    .of("/admin")
    .emit("welcome", "Welcome to the admin channel -from the main channel!");
});

ioServer.of("/admin").on("connection", (socket) => {
  console.log("Someone connected to the admin namespace!");
  ioServer.of("/admin").emit("welcome", "Welcome to the admin channel!");
});
