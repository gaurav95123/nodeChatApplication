const socket = io("http://localhost:8000");

const midSection = document.querySelector(".mid-section");
function appendMessage(msg, position) {
  var div = document.createElement("div");
  div.innerHTML = msg;
  div.classList.add("alert");
  if (position === "left") {
    div.classList.add("alert-primary");
    div.classList.add("left");
  } else if (position === "center") {
    div.classList.add("alert-light");
    div.classList.add("center");
  } else {
    div.classList.add("alert-success");
    div.classList.add("right");
  }
  midSection.appendChild(div);
}

const name = prompt("Enter Name to Join the Group Chat : ");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  appendMessage(`${name} Joined the Chat`, "center");
});

var messageContainer = document.getElementById("msg");
function sendMessage() {
  var message = messageContainer.value;
  socket.emit("send", message);
  appendMessage(`${message}:You`, "right");
  messageContainer.value = "";
}
socket.on("receive", (data) => {
  appendMessage(`${data.name}:${data.message}`, "left");
});

socket.on("left", (data) => {
  appendMessage(`${data.name}:Left the Chat`, "center");
});
