const socket = io("http://localhost:9000"); //by default this is the / namespace also referred to as a socketio endpoint
const socket2 = io("http://localhost:9000/admin"); //this is the /admin namespace||endpoint

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("dataToServer", { data: "Data from the client!" });
});

socket.on('joined',(msg)=>{
  console.log(msg)
})

socket2.on('welcome',(dataFromServer)=>{
  console.log(dataFromServer)
})

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMessage });
});
