//continued from joinNs.js ref-->VII(j)
function joinRoom(roomName) {
  //VIII.  we access the nsSocket variable which is declared at the beginning of the joinNs function and we emit a joinRoom event, pass it the roomName string and send a callback which is called on the server whenever we choose.
  nsSocket.emit("joinRoom", roomName, (newNumberOfMembers) => {
    //=====util: the code below updates the HTML of the .curr-room-num-users class
    //=====with the data that we get back from the newNumberOfMembers callback.
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user">`;
    //=====NB-->the order of data flow after this code runs takes place in slack.js [refBanana]
  });

  //VIII(a) we add a history related listener which hasn't triggered yet at this point.
  nsSocket.on("historyCatchUp", (history) => {
    //XI we grab the messages div
    console.log(history);
    const messagesUl = document.querySelector("#messages");

    //XI(a) ...we override its html...
    messagesUl.innerHTML = "";

    //XII(b)  ...we loop through all the messages within the desired room...
    history.forEach((msg) => {
      //XII(c)  ...we build some html using the messages... [XIII continues back in joinNs.js]
      const newMsg = buildHTML(msg);
      messagesUl.innerHTML += newMsg;
    });
    messagesUl.scrollTo(0, messagesUl.scrollHeight);
  });

  //VIII(b) we add a member-update related listener which hasn't triggered yet at this point.
  //XII(d)  the updateMembers event gets called when someone leaves and when someone joins and the number of members and room name html gets updated. 
  nsSocket.on("updateMembers", (numMembers) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${numMembers} <span class="glyphicon glyphicon-user">`;
    document.querySelector(".curr-room-text").innerText = `${roomName}`;
  });
  //VIII(c) below is the searchbox code which causes an error.  [IX continued back in slack.js]
  //   let searchBox = document.querySelector("#search-box");
  //   searchBox.addEventListener("input", (e) => {
  //     console.log(e.target.value);
  //     let messages = Array.from(document.getElementsByClassName("message-text"));
  //     console.log(messages);
  //     messages.forEach((msg) => {
  //       if (msg.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1) {
  //         //   the message does not contain the user search term!
  //         msg.style.display = "none";
  //       } else {
  //         msg.style.display = "block";
  //       }
  //     });
  //   });
}
