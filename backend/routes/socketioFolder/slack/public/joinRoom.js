function joinRoom(roomName) {
  //=====refactor issue: nsSocket is declared at the beginning of the joinNs function.
  nsSocket.emit("joinRoom", roomName, (newNumberOfMembers) => {
    //=====util: the code below updates the HTML of the .curr-room-num-users class
    //=====with the data that we get back from the newNumberOfMembers callback.
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user">`;
    //=====NB-->the order of data flow after this code runs takes place in slack.js [refBanana]
  });
  nsSocket.on("historyCatchUp", (history) => {
    console.log(history);
    const messagesUl = document.querySelector('#messages');
    messagesUl.innerHTML = "";
    history.forEach((msg)=>{
        const newMsg = buildHTML(msg)
        const currentMessages = messagesUl.innerHTML;
        messagesUl.innerHTML = currentMessages + newMsg;
    })
    messagesUl.scrollTo(0, messagesUl.scrollHeight);
  });
  nsSocket.on('updateMembers', (numMembers)=>{
    document.querySelector(".curr-room-num-users").innerHTML = `${numMembers} <span class="glyphicon glyphicon-user">`;
    document.querySelector(".curr-room-text").innerText = `${roomName}`;
  })
};
