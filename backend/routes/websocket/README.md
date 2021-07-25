Websocket notes:

1.  First, the server must listen for incoming socket connections using a standard TCP socket. Depending on your platform, this may be handled for you automatically. For example, let's assume that your server is listening on example.com, port 8000, and your socket server responds to GET requests at example.com/chat.

2.  Even though you're building a server, a client still has to start the WebSocket handshake process by contacting the server and requesting a WebSocket connection. So, you must know how to interpret the client's request. The client will send a pretty standard HTTP request with headers that looks like this (the HTTP version must be 1.1 or greater, and the method must be GET):

~~~
GET /chat HTTP/1.1
Host: example.com:8000
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
~~~

3.  When the server receives the handshake request, it should send back a special response that indicates that the protocol will be changing from HTTP to WebSocket. That header looks something like the following (remember each header line ends with \r\n and put an extra \r\n after the last one to indicate the end of the header):

~~~
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
~~~

note bene:
- The Sec-WebSocket-Accept header is important in that the server must derive it from the Sec-WebSocket-Key that the client sent to it. To get it, concatenate the client's Sec-WebSocket-Key and the string "258EAFA5-E914-47DA-95CA-C5AB0DC85B11" together (it's a "magic string"), take the [SHA-1 hash](https://en.wikipedia.org/wiki/SHA-1) of the result, and return the base64 encoding of that hash.
  - For example if the Key was "dGhlIHNhbXBsZSBub25jZQ==", the Sec-WebSocket-Accept header's value is "s3pPLMBiTxaQ9kYGzzhZRbK+xOo=".  Once the server sends these headers, the handshake is complete and data can be shared.
- The server must keep track of clients' sockets so you don't keep handshaking again with clients who have already completed the handshake. The same client IP address can try to connect multiple times.
  - For example, you might keep a table of usernames or ID numbers along with the corresponding WebSocket and other data that you need to associate with that connection.

