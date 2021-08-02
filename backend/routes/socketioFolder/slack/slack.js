const express = require("express");
const app = express();
const Server = require("socket.io");

let namespaces = require("./data/namespaces");
app.use(express.static(__dirname + "/public"));
const expressServer = app.listen(9000);
const ioServer = new Server(expressServer);

ioServer.on("connection", (socket) => {
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
  socket.emit("nsList", nsData);
});

namespaces.forEach((namespace) => {
  ioServer.of(namespace.endpoint).on("connection", (nsSocket) => {
    nsSocket.emit("nsRoomLoad", namespaces[0].rooms);

    nsSocket.on("joinRoom", (roomToJoin, numberOfUsersCallback) => {
      nsSocket.join(roomToJoin);

      //the code below is from socketio version 2 which should return a list of all the socket IDs that are in the "wiki" namespace and in the "general" room.  However, as of version 3 Socketio no longer uses the .clients() method.
      //=======code start=======
      ioServer
        .of("/wiki")
        .in("general")
        .clients((error, clients) => {
          console.log(clients);
        });
      //=======code end=======

      //As of version 3 .clients() is renamed to .allSockets() and now returns a promise (see socketio link below)
      //https://socket.io/docs/v3/migrating-from-2-x-to-3-0/#Namespace-clients-is-renamed-to-Namespace-allSockets-and-now-returns-a-Promise
    
    
      //This is my attempt below at using the new syntax but I'm unsure of how to access the data within the promise.
      
    //========code start=======
    // const clients = await ioServer.of('/wiki').in(roomToJoin).allSockets();
    // console.log(Array.from(clients));
    //=======code end==========


      numberOfUsersCallback();
    });
  });
});


