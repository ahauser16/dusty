# Project WhereWoof

### Project Overview

###### Project WhereWoof is a social media platform for dog owners who want to extend their dog's social circle using match-making features using a dog's criteria such as breed, temperment, age, etc. and physical proximity without compromising the user's home address and other personal information. The project will be following the MERN stack with an emphasis on using NodeJS and the npm packages available.

Helpful Links:

- [MERN Stack Overview](https://codedec.com/tutorials/full-stack-mern-tutorial/)
- [Folder Structure explained](https://codedec.com/tutorials/workflow-and-folder-structure-for-mern-application/)

### **M**ongoose

###### I decided to use a no-sql database for [various reasons](https://www.mongodb.com/why-use-mongodb) and [Mongoose](https://mongoosejs.com/docs/api.html) is the nodeJS package from MongoDB. I believe using Mongoose will help make the project a success because the goal of the application is to have a social media platform that will scale with the number of users, their interaction with one another using websocket technology superimposed over a map driven interface. This will involve a diverse and large amount of data and traffic.

### **E**xpress

###### The decision to use [Express](https://expressjs.com/) as the back-end web application framework was made for me since I wanted this project to be build on NodeJS.

### **R**eact

##### I am most interested in using [React](https://reactjs.org/) for the front-end for building user interfaces and UI components because of its ability to transpile my code such that it will be compatibile with android and IOS devices. Since this project is still in the early stages I won't be working with React until many other milestones are achieved.

### **N**odeJS

###### I am attracted to NodeJS because it utilizes the V8 Javascript engine, its asynchronous utility and the large amount of open source data available.

##### List of Node Modules (not native):

- Mongoose

  - [Mongoose npm package](https://www.npmjs.com/package/mongoose)

- React

  - [React npm package](https://www.npmjs.com/package/react)

- LeafletJS
  - [Leaflet npm package](https://www.npmjs.com/package/leaflet)
  - [Leaflet Github Repo](https://github.com/Leaflet/Leaflet)
  - [Leaflet Homepage](https://leafletjs.com/)
- React LeafletJS

  - [React Leaflet npm package](https://www.npmjs.com/package/react-leaflet)
  - [React Leaflet Github Repo](https://github.com/PaulLeCam/react-leaflet)
  - [React Leaflet Homepage](https://react-leaflet.js.org/)

- Travel Time API

  - [Travel-Time npm package](https://www.npmjs.com/package/traveltime-api-sdk-ts)
  - [Travel-Time software development package (Github Repo)](https://github.com/traveltime-dev/traveltime-sdk-openAPI)
  - [Company Homepage](https://traveltime.com/)
  - [API Documentation](https://traveltime.com/docs/api/overview/introduction)
  - [Front End API Example](https://app.traveltime.com/reachableFrom/33%2C%20Argyle%20Road%2C%20Ditmas%20Park%2C%20Brooklyn%2C%20New%20York%2C%20Kings%20County%2C%20New%20York%2C%2011226%2C%20United%20States%20of%20America@lat40.6488008@lng-73.9673074/within/30/minutes/public-transport/radius)
  - Feature List:
    - Send a meetup marker to another user.
    - Find other active users within a user-specified time radius.

- [Websocket JS npm package documentation](https://www.npmjs.com/package/websocket) and [Github Repo](https://github.com/theturtle32/WebSocket-Node).  The [test folder](https://github.com/theturtle32/WebSocket-Node/tree/a2cd3065167668a9685db0d5f9c4083e8a1839f0/test/scripts) is particularly helpful with examples. 
- [The WebSocketAPI documentation from W3C Group](https://www.w3.org/TR/websockets/) is retired and MUST NOT BE USED for further technical work.  See the [HTML Living Standard docs for the MessageEvent interface](https://html.spec.whatwg.org/#comms) instead.
In 2019, the WHATWG and W3C signed an agreement to collaborate on a single version of HTML going forward: [this document](https://html.spec.whatwg.org/#introduction).


- Socket.io is a popular websocket package because it utilizes longpolling and has built in protocols to deal with firewall and web-browser incompatibilities.  However, Socket.IO is NOT a WebSocket implementation. Although Socket.IO indeed uses WebSocket as a transport when possible, it adds additional metadata to each packet. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a plain WebSocket server either.
  - [Socket.io npm package](https://www.npmjs.com/package/socket.io)
  - [Socket.io Github Repo](https://github.com/socketio/socket.io)
  - [article about MERN folder structure for socket.io](https://itnext.io/using-socket-io-with-a-mern-stack-93f4245e86e7) and its [associated Github repo](https://github.com/keithweaver/MERN-boilerplate)
  - [another article about MERN folder structure for socket.io](https://medium.com/@gil.palikaras/build-a-chat-web-app-with-mern-stack-and-socket-io-8f33d151c62c#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjFiZjhhODRkM2VjZDc3ZTlmMmFkNWYwNmZmZDI2MDcwMWRkMDZkOTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2MjYyMDQwNDgsImF1ZCI6IjIxNjI5NjAzNTgzNC1rMWs2cWUwNjBzMnRwMmEyamFtNGxqZGNtczAwc3R0Zy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNzU0Mzg4NzY0MTQyNTI2MjQxOSIsImVtYWlsIjoiYXJ0aHVyLmhhdXNlckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiMjE2Mjk2MDM1ODM0LWsxazZxZTA2MHMydHAyYTJqYW00bGpkY21zMDBzdHRnLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6IkFydGh1ciBIYXVzZXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2lVb0h1eDVmQUoxcWNDLXpNLVVYdTktSGZlNXBSWUJ1SmQ0MGw3MWc9czk2LWMiLCJnaXZlbl9uYW1lIjoiQXJ0aHVyIiwiZmFtaWx5X25hbWUiOiJIYXVzZXIiLCJpYXQiOjE2MjYyMDQzNDgsImV4cCI6MTYyNjIwNzk0OCwianRpIjoiMTJjY2NlMTU4YjUzNGMwNzgxNGE2NjAxODk0NjNjZTk1ZTI1MjNkZSJ9.tnZOQ1nk6k09oF8fNGhIY9hqPqr5v3UfPhD6bEN-UUNw3xmtIKOCnyuCWiYMO715pR5_jw0Wk_B9BGMjAagZXqpu7lPODkp1ka26hiVK_rm7UML6tXatdq3n9QW-03OvYohD80DA3jUBZSS87AH39bXaRVmHxushVj7vrQI1TqgBYV4pmuBUnB4ZePDXpJ7QtgJg8pxgda1TPxZg2NPAueU5qxReFvPY5hHz5evsQr1TNF8BCk0K51rm1NTZIGS9160fp20cGOM1bMfK4zfWV2a9ni6pnCEJhCZJPsXXJUZAhgEeYYxInE_toLIhzx07D1GcFcWtjzBk3OnH87JuDA)
    - websocket client-server model
![websocket client/server model](./ReadMeAssets/web-socket-client-server-model.png)
    - socket.io client-server model
![socket.io client-server model](./ReadMeAssets/socketio-client-server-model.png)

---

### ToDo List:

1.  design the project's data structure incorporating user data, map data and dynamic data traffic between the two over a websocket connection.
2.  refactor the travel-time api code using the npm module and organize by feature.
