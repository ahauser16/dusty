//V.  The code that runs when a user joins a new namespace...
function joinNs(endpoint) {
  //V(a).  first we check to see if nsSocket is actually a socket and if not we end the connection...
  if (nsSocket) {
    nsSocket.close();
    //V(b).  ...and then remove the eventListener before it's added again.
    document
      .querySelector("#user-input")
      .removeEventListener("submit", formSubmission);
  }
  //V(c).  we override the nsSocket global variable back in clientScripts.js by assigning it to the io() function and passing in the desired namespace a/k/a endpoint a/k/a the URL (which means a new client connection to the `http://localhost:9000${endpoint}` url is initialized).
  nsSocket = io(`http://localhost:9000${endpoint}`);
  //V(d).  Once the user is connected to the new namespace we start to listen for the 'nsRoomLoad' event...
  //===scroll down to V(e)===
  
  //VII.  at this point the nsRoomLoad event has triggered and nsRooms is our array of rooms that was sent back in slack.js ref-->VI(c)
  nsSocket.on("nsRoomLoad", (nsRooms) => {
      //VII(a).  we declare roomList and grab all elements from the DOM with the class of room-list...
    let roomList = document.querySelector(".room-list");
    //VII(b).  ...we override the roomList html so that it's empty...
    roomList.INNERhtml = "";
    //VII(c)    ...then loop through the array of rooms and add logic to decide if the room's icon will be 'locked' or a 'globe'...
    nsRooms.forEach((room) => {
      let glyph;
      if (room.privateRoom) {
        glyph = "lock";
      } else {
        glyph = "globe";
      }
      //VII(d)  ...and we update the roomList element with the appropriate glyph and room title
      roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`;
    });

    // VII(e) we grab all DOM elements with a class of room and assign them to roomNodes which is an HTML collection.
    let roomNodes = document.getElementsByClassName("room");
    //VII(f)...we convert that HTML collection into an array and loop through it to...
    Array.from(roomNodes).forEach((elem) => {
        //VII(g)...add a click listener to each room and pass each room the inner text of the room that was clicked on.
      elem.addEventListener("click", (e) => {
        // console.log("Someone clicked on ", e.target.innerText);
        joinRoom(e.target.innerText);
      });
    });

    //VII(h) we immediately add the user to the first room in the array of rooms
    const topRoom = document.querySelector(".room");
    //VII(i) the inner text of the first room will always be "New Articles" 
    const topRoomName = topRoom.innerText;
    // console.log(topRoomName);
    //VII(j) we pass the inner text to the joinRoom function [VIII continued at joinRoom.js]
    joinRoom(topRoomName);
  });

  //V(e).  ...and start to listen to the 'messageToClients' event...
  nsSocket.on("messageToClients", (msg) => {
    const newMsg = buildHTML(msg);
    document.querySelector("#messages").innerHTML += newMsg;
  });

  //V(f).  ...and start to listen to the 'submit' event which is the message input box at the bottom of the page.
  //[VI] continues back in slack.js
  document
    .querySelector(".message-form")
    .addEventListener("submit", formSubmission);
}

//FYI by the time the code runs and hits V(f) we aren't concerned with the code below yet.
function formSubmission(event) {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  nsSocket.emit("newMessageToServer", { text: newMessage });
}

//FYI by the time the code runs and hits V(f) we aren't concerned with the code below yet.
//XIII - continued from joinRoom.js
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
