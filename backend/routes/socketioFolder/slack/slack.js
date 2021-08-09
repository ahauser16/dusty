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

    const username = nsSocket.handshake.query.username;
    
    nsSocket.emit("nsRoomLoad", namespace.rooms);

    nsSocket.on("joinRoom", (roomToJoin, numberOfUsersCallback) => {
      const roomToLeave = Object.keys(nsSocket.rooms)[1];
      nsSocket.leave(roomToLeave);
      updateUsersInRoom(namespace, roomToLeave);

      nsSocket.join(roomToJoin);
      ioServer
        .of(namespace.endpoint)
        .in(roomToJoin)
        //no longer in use
        .clients((error, clients) => {
          console.log(clients.length);
          numberOfUsersCallback(clients.length);
        });
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomToJoin;
      });
      console.log(nsRoom);
      nsSocket.emit("historyCatchUp", nsRoom.history);
      updateUsersInRoom(namespace, roomToJoin);
    });

    nsSocket.on("newMessageToServer", (msg) => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: username,
        avatar: "https://via.placeholder.com/30",
      };
      const roomTitle = Object.keys(nsSocket.rooms)[1];
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomTitle;
      });
      console.log(nsSocket.rooms);
      console.log(nsRoom);
      nsRoom.addMessage(fullMsg);
      ioServer.of(namespace.endpoint).to(roomTitle).emit("messageToClients", fullMsg);
    });
  });
});

function updateUsersInRoom(namespace, roomToJoin){
  ioServer.of(namespace.endpoint).in(roomToJoin).clients((error, clients) => {
    console.log(`There are ${clients.length} clients in this room!!!`);
    ioServer.of(namespace.endpoint).in(roomToJoin).emit('updateMembers', clients.length)
  });
}


//As of version 3 .clients() is renamed to .allSockets() and now returns a promise (see socketio link below)
//https://socket.io/docs/v3/migrating-from-2-x-to-3-0/#Namespace-clients-is-renamed-to-Namespace-allSockets-and-now-returns-a-Promise

//the code below is from socketio version 2 which should return a list of all the socket IDs that are in the targeted namespace and in the "general" room.  However, as of version 3 Socketio no longer uses the .clients() method.
//=======code start=======
//   ioServer
//     .of("/wiki")
//     .in(roomToJoin)
//     .clients((error, clients) => {
//       console.log(clients);
//     });
//=======code end=======
