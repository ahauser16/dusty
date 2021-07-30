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
  ioServer.of(namespace.endpoint).on("connection", (nsSocket) => {
    console.log(`${nsSocket.id} has joined ${namespace.endpoint}`);
    nsSocket.emit("nsRoomLoad", namespaces[0].rooms);

    nsSocket.on("joinRoom", (roomToJoin, numberOfUsersCallback) => {
      nsSocket.join(roomToJoin);

      //=====START=====
      //===bug to fix -->this line of code below to obtain the clients is no longer used as of socket.io v3 (the latest version is v4)
      //===see --> https://stackoverflow.com/questions/18093638/socket-io-rooms-get-list-of-clients-in-specific-room
      //===see --> https://socket.io/docs/v3/server-api/#server-sockets
      //===SEE --> https://socket.io/docs/v3/migrating-from-2-x-to-3-0/#Namespace-clients-is-renamed-to-Namespace-allSockets-and-now-returns-a-Promise
    //   ioServer
    //     .of("/wiki")
    //     .in(roomToJoin)
    //     .clients((error, clients) => {
    //       console.log(clients.length);
    //     });
      //=====END=====
     
          let getClientIds = async function (){
            ioServer.of("/wiki").in(roomToJoin).allSockets();
          } 
          getClientIds();
     
      numberOfUsersCallback();
    });

    // nsSocket.on("newMessageToServer", (msg) => {
    //   const fullMsg = {
    //     text: msg.text,
    //     time: Date.now(),
    //     username: "rbunch",
    //     avatar: "https://via.placeholder.com/30",
    //   };

    //   const roomTitle = Object.keys(nsSocket.rooms)[1];

    //   console.log(fullMsg);
    //   console.log(nsSocket.rooms);
    //   console.log(roomTitle);

    //   ioServer
    //     .io.of('/wiki')
    //     .to(roomTitle)
    //     .emit("messageToClients", fullMsg);
    // });
  });
});
