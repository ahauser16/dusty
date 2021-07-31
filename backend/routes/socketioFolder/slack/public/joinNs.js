function joinNs(endpoint) {
  if (nsSocket) {
    //check to see if nsSocket is actually a socket
    nsSocket.close();

    //remove the eventListener before it's added again.
    document.querySelector("#user-input").removeEventListener("submit", formSubmission);
  }

  nsSocket = io(`http://localhost:9000${endpoint}`);
  nsSocket.on("nsRoomLoad", (nsRooms) => {
    let roomList = document.querySelector(".room-list");
    roomList.INNERhtml = "";
    nsRooms.forEach((room) => {
      let glyph;
      if (room.privateRoom) {
        glyph = "lock";
      } else {
        glyph = "globe";
      }
      roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`;
    });

    // adds click listener to each room
    let roomNodes = document.getElementsByClassName("room");
    Array.from(roomNodes).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        // console.log("Someone clicked on ", e.target.innerText);
        joinRoom(e.target.innerText)
      });
    });

    //when nsRoom() runs we also need to immediately add the user to a room...first time here
    //NB--> document.querySelector will grab the first element with the class of 'room'
    const topRoom = document.querySelector(".room");
    const topRoomName = topRoom.innerText;
    console.log(topRoomName);
    joinRoom(topRoomName);
  });

  nsSocket.on("messageToClients", (msg) => {
    const newMsg = buildHTML(msg);
    document.querySelector("#messages").innerHTML += newMsg;
  });

  document.querySelector(".message-form").addEventListener("submit", formSubmission);
}

function formSubmission(event) {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  nsSocket.emit("newMessageToServer", { text: newMessage });
}

function buildHTML(msg) {
  const convertedDate = new Date(msg.time).toLocaleString();
  const newHTML = `
    <li>
          <div class="user-image">
            <img src="${msg.avatar}" />
          </div>
          <div class="user-message">
            <div class="user-name-time">${msg.username} <span>${convertedDate}</span></div>
            <div class="message-text">${msg.text}</div>
          </div>
        </li>
        `;
  return newHTML;
}
