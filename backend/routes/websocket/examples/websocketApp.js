//FYI '#!/usr/bin/env node' is an instance of a shebang line: the very first line 
//in an executable plain-text file on Unix-like platforms that tells the system what 
//interpreter to pass that file to for execution, via the command line following the 
//magic #! prefix (called shebang).  Windows does not support shebang lines, so they're 
//effectively ignored there; on Windows it is solely a given file's filename extension 
//that determines what executable will interpret it. However, you still need them in 
//the context of npm.
//more on this topic here --> https://stackoverflow.com/questions/33509816/what-exactly-does-usr-bin-env-node-do-at-the-beginning-of-node-files

//the code below if from-->https://www.npmjs.com/package/websocket
//this npm package is a JS library that utilizes the https://html.spec.whatwg.org/#comms
//==========================
//==B O I L E R P L A T E===
//==========START===========

var WebSocketServer = require('websocket').server;
var WebSocketClient = require('websocket').client;
var WebSocketFrame  = require('websocket').frame;
var WebSocketRouter = require('websocket').router;
var W3CWebSocket = require('websocket').w3cwebsocket;

//============END===========
//==B O I L E R P L A T E===
//==========================