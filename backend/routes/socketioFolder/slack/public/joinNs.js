function joinNs(endpoint) {
  const nsSocket = io("http://localhost:9000/wiki");
  nsSocket.on("nsRoomLoad", (nsRooms) => {
    // console.log(nsRooms) --> at this point when we get nsRooms back then we need DOM manipulation.
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

    // add click listener to each room
    let roomNodes = document.getElementsByClassName("room");
    Array.from(roomNodes).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        console.log("Someone clicked on", e.target.innerText);
      });
    });
  });
}
