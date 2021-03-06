const username = prompt("What is your username?");

const socket = io("http://localhost:9000", {
  query: {
    username,
  },
});

let nsSocket = "";

socket.on("nsList", (nsData) => {
  let namespacesDiv = document.querySelector(".namespaces");
  namespacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    namespacesDiv.innerHTML += `<div class="namespace" data-ns=${ns.endpoint} ><img src="${ns.img}" /></div>`;
  });

  Array.from(document.getElementsByClassName("namespace")).forEach((elem) => {
    elem.addEventListener("click", (e) => {
      const nsEndpoint = elem.getAttribute("data-ns");
      // console.log(`${nsEndpoint} I should go to now`);
      joinNs(nsEndpoint);
    });
  });
  joinNs('/wiki');
});


