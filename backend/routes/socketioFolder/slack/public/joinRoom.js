function joinRoom(roomName) {
  //=====todo: send this roomName to the server!
  //=====refactor issue: nsSocket is declared at the beginning of the joinNs function.
  nsSocket.emit("joinRoom", roomName, (newNumberOfMembers) => {
    //todo: we want to update the room member total now that a new user has joined!
    //=====util: the code below updates the HTML of the .curr-room-num-users class
    //=====with the data that we get back from the newNumberOfMembers callback.
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user">`;
    //=====NB-->the order of data flow after this code runs takes place in slack.js [refBanana]
  });
}
