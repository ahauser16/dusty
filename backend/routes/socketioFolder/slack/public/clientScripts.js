const socket = io("http://localhost:9000"); //by default this is the / namespace also referred to as a socketio endpoint
let nsSocket = "";

//util: while we are listening for the nsList event and then triggers...
socket.on("nsList", (nsData) => {
  console.log("the list of namespaces has arrived");
  //util: ...we update the DOM...
  let namespacesDiv = document.querySelector(".namespaces");
  namespacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint} ><img src="${ns.img}" /></div>`;
  });

  //util: ...we add the click-listeners for each namespace...
  console.log(document.getElementsByClassName("namespace"));
  Array.from(document.getElementsByClassName("namespace")).forEach((elem) => {
    elem.addEventListener("click", (e) => {
      const nsEndpoint = elem.getAttribute("ns");
      // console.log(`${nsEndpoint} I should go to now`);

      //this event below happens when the user clicks on it
      //CURRENT BUG TO FIX IS THE LINE OF CODE BELOW...
      //WE GET THE ERROR BELOW:
      //C:\Users\arthu\development\projectWhereWoof\dustyv3\backend\routes\socketioFolder\slack\slack.js:50
      //       nsSocket.emit("historyCatchUp", nsRoom.history);
      // TypeError: Cannot read property 'history' of undefined
      // joinNs(nsEndpoint);
    });
  });
  //this event below happens automatically
  joinNs("/wiki");
});
