const express = require("express");
const app = express();
const Server = require("socket.io");

let namespaces = require("./data/namespaces");
app.use(express.static(__dirname + "/public"));
const expressServer = app.listen(9000);
const ioServer = new Server(expressServer);

//  NB--> `ioServer.on` is the equivalent to `io.of('/').on`.
//  if you don't specify a namespace the default will be '/'.

//  I.  any time a new socket connects the (socket)=>{...} callback will run.
ioServer.on("connection", (socket) => {
  //  I(a).  builds an array of each namespace with its data...
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
  // I(b).  ...to send back to the socket ( or the client) that just connected to the namespace.
  // [II continued in clientScripts.js]
  socket.emit("nsList", nsData);
});

//VI.  loop through each namespace and listen for a connection event...
namespaces.forEach((namespace) => {
  //  VI(a).  ...and we target the namespace with `ioServer.of(namespace.endpoint)` and we add the 'connection' event listener.  remember that back in joinNs.js at ref V(c) we initiated the connection to the desired namespace/endpoint/URL so at this point in the code the 'connection' event has triggered and the (nsSocket)=>{...} call back will run.
  ioServer.of(namespace.endpoint).on("connection", (nsSocket) => {
    // VI(b) we have access to nsSocket and remember that the `nsSocket.handshake.query.username` data was sent over back in clientScripts.js at ref-->II.
    const username = nsSocket.handshake.query.username;

    //  VI(c) we emit the nsRoomLoad event which sends all the rooms to the desired namespace...[VII continued in joinNs.js].  also, remember that ref V(d) in joinNs.js is where the roomLoad event listner was first added]
    nsSocket.emit("nsRoomLoad", namespace.rooms);
    //  VI(d) ...we add a joinRoom event listener to our desired namespace ...
    //  IX.  continued from joinRoom.js
    nsSocket.on("joinRoom", (roomToJoin, numberOfUsersCallback) => {
    //   console.log(roomToJoin);

      //roomToJoin needs to default to the new room.

      //   IX(a).  before the user can leave a room we need to know what room that user is in. remember that every individual socket automatically joins its own room and the key for that room is the socket id.  the [1] index will always be the new room that was joined so we grab that socket-id pass it to the leave() concatinated on nsSocket thus making it to leave which causes it to be in its own private room.  we [try] to access the 1nth element of the rooms property of this particular socket with Object.keys() BUT it causes an ERROR.  This is because in socketio version 2 you could manipulate all the sockets associated with a given namespace with: `const sockets = io.of("/").connected` but now in socketio version 4 `Namespace.connected` has been renamed to `Namespace.sockets` and is now a Map.

      const roomToLeave = Object.keys(nsSocket.rooms)[1];
      console.log(roomToLeave);
      nsSocket.leave(roomToLeave);
      updateUsersInRoom(namespace, roomToLeave);
      //X(c).  we join that room...
      nsSocket.join(roomToJoin);
      //X(d).  ...we look for which room of ours in the namespace...
      const nsRoom = namespace.rooms.find((room) => {
        //X(e)...has that room title which in our case is General...
        // console.log(
        //   "finding",
        //   room.roomTitle,
        //   "=",
        //   roomToJoin,
        //   room.roomTitle === roomToJoin
        // );
        return room.roomTitle === roomToJoin;
      });
      //   console.log("nsRoom", nsRoom);
        // console.log(nsRoom)
      //the room names aren't changing when a new namespace is selected

      //   X(f)...and then we emit the 'historyCatchUp' event, where we grab nsRoom which is the room that matched up to the General room, and we emit that rooms history.  however, this is also causing an error
      //===start===the code directly below is causing the history property ERROR back in clientScripts.js line 40.
      nsSocket.emit("historyCatchUp", nsRoom.history);

      //X(g) ...we updateUsersInRoom again because at this point the user will have joined [XI continued at joinRoom.js]
      updateUsersInRoom(namespace, roomToJoin);
      //   =====end========
    });

    //  VI(e) ...we add a newMessageToServer event listener to our desired namespace.
    nsSocket.on("newMessageToServer", (msg) => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: username,
        avatar: "https://via.placeholder.com/30",
      };
      //   console.log(fullMsg);
      //   console.log(nsSocket.rooms);

      //V.  now we need to get the reference to that second key/value pair within nsSocket.rooms.
      //    BUG TO FIX-->this Object.keys method doesn't work with the current version of socketio.
      //    NOTE this is the first mention of this Object.keys bug but it is also used later in the tutorial above.  However, I think once we fix this Object.keys bug then our code will work as intended.  see reference PIZZA.
      const roomTitle = (nsSocket.rooms);
      console.log(roomTitle);

      //the code below works but fullMsg properties aren't being referenced correctly because I don't know how to iterate through nsSocket.rooms which is an ES6 Set and not a regular object or an array.
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomTitle;
      });
      //   console.log(
      //     "The room object that we made that matches this NS room is..."
      //   );
      //   console.log(nsRoom);
      nsRoom.addMessage(fullMsg);
      ioServer
        .of(namespace.endpoint)
        .to(roomTitle)
        .emit("messageToClients", fullMsg);
    });
  });
});

//NB at this point in the code (VI(e)) this code has not run yet.
//X at this point the roomToJoin object refers to New Articles
function updateUsersInRoom(namespace, roomToJoin) {
  //X(a).  desired behavior: send back the number of users to ALL sockets connected to this room
  //below ioServer.of() grabs namespace.endpoint && .in() grabs roomToJoin && and then we TRY to chain on the .clients method which is discontinued in socketio version 4 so it causes an ERROR.  see below references that should fix this issue but I can't get it to work on my own.
  ioServer
    .of(namespace.endpoint)
    .in(roomToJoin)
    .clients((error, clients) => {
      //   console.log(`There are ${clients.length} in this room`);
      ioServer
        .of(namespace.endpoint)
        .in(roomToJoin)
        //X(b).  the updateMembers event gets emitted so back up at X(c)...
        .emit("updateMembers", clients.length);
    });
}

//https://socket.io/docs/v3/migrating-from-2-x-to-3-0/#Namespace-clients-is-renamed-to-Namespace-allSockets-and-now-returns-a-Promise
//===see --> https://stackoverflow.com/questions/18093638/socket-io-rooms-get-list-of-clients-in-specific-room
//===see --> https://socket.io/docs/v3/server-api/#server-sockets
//===SEE --> https://socket.io/docs/v3/migrating-from-2-x-to-3-0/#Namespace-clients-is-renamed-to-Namespace-allSockets-and-now-returns-a-Promise

//   ===START=======the code below is an attempt to gain access to all the client ids from all sockets within each and every room within each and every namespace.===================================
//    let getClientIds = async function (){
//     ioServer.of(namespace.endpoint).in(roomToJoin).allSockets();
//   }
//   getClientIds();

//===END===========================================
