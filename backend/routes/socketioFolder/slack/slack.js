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
    
    nsSocket.emit("nsRoomLoad", namespace.rooms);

    nsSocket.on("joinRoom", (roomToJoin, numberOfUsersCallback) => {

      nsSocket.join(roomToJoin);
      //===bug to fix -->this line of code below to obtain the clients is no longer used as of socket.io v3 (the latest version is v4)
      //===see --> https://stackoverflow.com/questions/18093638/socket-io-rooms-get-list-of-clients-in-specific-room
      //===see --> https://socket.io/docs/v3/server-api/#server-sockets
      //===SEE --> https://socket.io/docs/v3/migrating-from-2-x-to-3-0/#Namespace-clients-is-renamed-to-Namespace-allSockets-and-now-returns-a-Promise
      //=====START=====
      //   ioServer.of(namespace.endpoint).in(roomToJoin).clients((error, clients) => {
      //       console.log(clients);
      //       console.log(clients.length);
      //       numberOfUsersCallback(clients.length);
      //     });
      //=====END=====

      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomToJoin;
      });
      //   console.log(nsRoom)
      //below the history property is causing the error.
    //   nsSocket.emit("historyCatchUp", nsRoom.history);
      //send back the number of users to ALL sockets connected to this room
      ioServer
        .of(namespace.endpoint)
        .in(roomToJoin)
        .clients((error, clients) => {
          console.log(`There are ${clients.length} in this room`);
          ioServer
            .of(namespace.endpoint)
            .in(roomToJoin)
            .emit("updateMembers", clients.length);
        });

      //   let getClientIds = async function (){
      //     ioServer.of(namespace.endpoint).in(roomToJoin).allSockets();
      //   }
      //   getClientIds();
    });

    //I. the code below sends the msg to ALL the sockets that are in the room which THIS socket is in.
    //II. question: how can we find out what rooms THIS socket is in?
    //III. answer: console.log(nsSocket.rooms);
    //IV.  the user will be in the 2nd room in this object list because...
    //...the socket ALWAYS joins its own room on connection.
    nsSocket.on("newMessageToServer", (msg) => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: "rbunch",
        avatar: "https://via.placeholder.com/30",
      };
      console.log(fullMsg);
      //   console.log(nsSocket.rooms);

      //V.  now we need to get the reference to that second key/value pair within nsSocket.rooms.
      //    BUG TO FIX-->this Object.keys method doesn't work
      const roomTitle = Object.keys(nsSocket.rooms)[1];

      //the code below works but fullMsg properties aren't being referenced correctly because I don't know how to iterate through nsSocket.rooms which is an ES6 Set and not a regular object or an array.
      //todo: we need to find the Room object for the room below.
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomTitle;
      });
      console.log(
        "The room object that we made that matches this NS room is..."
      );
      console.log(nsRoom);
      nsRoom.addMessage(fullMsg);
      ioServer
        .of(namespace.endpoint)
        .to(roomTitle)
        .emit("messageToClients", fullMsg);
    });

    //   ioServer
    //     .io.of(namespace.endpoint)
    //     .to(roomTitle)
    //     .emit("messageToClients", fullMsg);
  });
});
