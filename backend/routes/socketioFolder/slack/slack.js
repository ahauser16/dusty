const express = require("express");
const app = express();
const Server = require("socket.io");
let namespaces = require("./data/namespaces");
app.use(express.static(__dirname + "/public"));
const expressServer = app.listen(9000);
const ioServer = new Server(expressServer);

//`ioServer.on` is the equivalent to `io.of('/').on`.  if you don't specify a namespace the default will be '/'.
ioServer.on("connection", (socket) => {
  //   todo(a): build an array to send back with the img and endpoint for each namespace
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
  // console.log(nsData)
  // todo(b): send the nsData back to the client.
  // We need to use socket, NOT ioServer, because we want it to only go to this client.
  socket.emit("nsList", nsData);
});

//todo: loop through each namespace and listen for a connection
namespaces.forEach((namespace) => {
    //   console.log(namespace);
      ioServer.of(namespace.endpoint).on("connection", (nsSocket) => {
          //this logs to the console when a user/client enters a namespace
        console.log(`${nsSocket.id} has joined ${namespace.endpoint}`);
        // todo: a socket has connected to one of our chatgroup namespaces.
        //     : send that namespace group info back to the socket.
        // n.b.: right now the code below is only coded to handle wikipedia.
        nsSocket.emit('nsRoomLoad', namespaces[0].rooms)
      });
    });