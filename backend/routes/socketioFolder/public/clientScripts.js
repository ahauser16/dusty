//these three sockets are all joined by the client (meaning the client makes the request to join them) but you can use whatever authentication method you want on your server.
//QUESTION: what could be a good alternative?
const socket = io("http://localhost:9000"); //this is the / namespace||endpoint
const socket2 = io("http://localhost:9000/admin"); //this is the /admin namespace||endpoint
const socket3 = io("http://localhost:9000/marketing"); //this is the /marketing namespace||endpoint

console.log(socket.io);
socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("messageToServer", { data: "This is from the client" });
});

document
  .querySelector("#message-form")
  .addEventListener("submit", (event) => {
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