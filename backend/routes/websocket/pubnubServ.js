// Node.js WebSocket server script
const http = require("http");
const WebSocketServer = require("websocket").server;

//https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers
//1-First, the server must listen for incoming socket connections using a standard TCP socket on port 9898 and responds to GET requests at your desired UFL (e.g. example.com/chat).
const server = http.createServer();
server.listen(9898);

const wsServer = new WebSocketServer({
  httpServer: server,
});

wsServer.on("request", function (request) {
  const connection = request.accept(null, request.origin);

  connection.on("message", function (message) {
    console.log("Received Message:", message.utf8Data);
    connection.sendUTF("Hi this is WebSocket server!");
  });
  connection.on("close", function (reasonCode, description) {
    console.log("Client has disconnected.");
  });
});
