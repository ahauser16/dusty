const username = prompt("What is your username?");
// const socket = io("http://localhost:9000"); //by default this is the / namespace a/k/a a socketio endpoint
//  II.  in place of an authorization protocol we prompt the user for their username.
//       Todo: create a user authorization and handler here.
const socket = io("http://localhost:9000", {
  query: {
    username,
  },
});

//  III.  we set the nsSocket global variable as an empty string
let nsSocket = "";

//  IV.  we listen to localhost:9000 for the 'nsList' event
socket.on("nsList", (nsData) => {
  // console.log("the list of namespaces has arrived");

  //IV(a).  we fetch the '.namespace' class from the DOM and assign it to the namespacesDiv...
  let namespacesDiv = document.querySelector(".namespaces");
  //IV(b).  ...and then clear out its HTML.
  namespacesDiv.innerHTML = "";
  //IV(c).  We loop through the array of namespaces and data received from the server...
  nsData.forEach((ns) => {
    //IV(d).  ...then we update the DOM with the namespace's endpoint and image.
    namespacesDiv.innerHTML += `<div class="namespace" data-ns=${ns.endpoint} ><img src="${ns.img}" /></div>`;
  });

  // console.log(document.getElementsByClassName("namespace"));

  //IV(e)  We grab all the elements from the DOM with the class of namespace, turn it into an array (because
  //       `document.getElementsByClassName("namespace")` comes back as an HTML collection), loop through that
  //       array (using forEach) and add a 'click' event listener to all of them.
  Array.from(document.getElementsByClassName("namespace")).forEach((elem) => {
    elem.addEventListener("click", (e) => {
      //IV(f)  Whenever this 'click' event triggers the user will join that namespace/endpoint...
      //  ANY CUSTOM ATTRIBUTE SHOULD BEGIN WITH 'data-ns' in this situation
      const nsEndpoint = elem.getAttribute("data-ns");

      //=====CURRENT BUG TO FIX IS THE LINE OF CODE BELOW.=====
      //=====WE GET THE ERROR BELOW: Cannot read property 'history' of undefined=====
      joinNs(nsEndpoint);
      //=======================================================
    });
  });
  //IV(g) ...whereas this event below happens automatically regardless. [V. continues in the joinNs.js file]

  joinNs("/wiki");
});
