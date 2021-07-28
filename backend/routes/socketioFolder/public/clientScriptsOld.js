//these three sockets are all joined by the client (meaning the client makes the request to join them) but you can use whatever authentication method you want on your server.
//QUESTION: what could be a good alternative?
const socket = io("http://localhost:9000"); //by default this is the / namespace also referred to as a socketio endpoint
const socket2 = io("http://localhost:9000/admin"); //this is the /admin namespace||endpoint

console.log(socket.io);

socket.on("connect", () => {
  console.log(socket.id);
});

socket2.on("connect", () => {
  //this is an error...this should log the same id as the main namespace EXCEPT it should have: /admin#  in front of the id number.
  console.log(socket2.id);
});

socket2.on('welcome',(msg)=>{
  console.log(msg)
})

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("dataToServer", { data: "Data from the client!" });
});

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMessage });
});

socket.on("messageToClients", (msg) => {
  console.log(msg);
  document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
});

// socket.on('ping',()=>{
//   console.log('Ping was received from the server.');
// })

// socket.on('pong', (latency)=>{
//   console.log(latency);
//   console.log("Pong was sent to the server.")
// })
