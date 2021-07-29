const socket = io("http://localhost:9000"); //by default this is the / namespace also referred to as a socketio endpoint

//todo: listen for nsList which is a list of all the namespaces
//util: this is when we get the event back from the main namespace with the list.
socket.on("nsList", (nsData) => {
  console.log("the list of namespaces has arrived");
  console.log(nsData);
  let namespacesDiv = document.querySelector(".namespaces");
  namespacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint} ><img src="${ns.img}" /></div>`;
  });

  //add a clicklistener for each namespace
  Array.from(document.getElementsByClassName("namespace")).forEach((elem) => {
    // console.log(elem);
    elem.addEventListener("click", (e) => {
      // console.dir(e.target);
      const nsEndpoint = elem.getAttribute("ns");
      console.log(`${nsEndpoint} I should go to now`);
    });
  });
  //===start===
  //===the code below has been abstracted into the joinNs.js file because it will be
  //===used over and over again.
  // const nsSocket = io("http://localhost:9000/wiki");
  // nsSocket.on("nsRoomLoad", (nsRooms) => {
  //   let roomList = document.querySelector(".room-list");
  //   roomList.INNERhtml = "";
  //   nsRooms.forEach((room) => {
  //     let glyph;
  //     if (room.privateRoom) {
  //       glyph = "lock";
  //     } else {
  //       glyph = "globe";
  //     }
  //     roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`;
  //   });

  //   let roomNodes = document.getElementsByClassName("room");
  //   Array.from(roomNodes).forEach((elem) => {
  //     elem.addEventListener("click", (e) => {
  //       console.log("Someone clicked on", e.target.innerText);
  //     });
  //   });
  // });
  //======end=======
});

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("dataToServer", { data: "Data from the client!" });
});

document.querySelector(".message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMessage });
});

socket.on("messageToClients", (msg) => {
  console.log(msg);
  document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
});
