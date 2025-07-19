let usernames = [];

function updateList() {
  const list = document.getElementById("userList");
  list.innerHTML = "";
  usernames.forEach((name, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${name} <button onclick="removeUsername(${index})">Delete</button>`;
    list.appendChild(li);
  });
}

function addUsername() {
  const input = document.getElementById("usernameInput");
  const name = input.value.trim();
  if (!name || usernames.includes(name)) return;
  usernames.push(name);
  input.value = "";
  updateList();
  sendUpdate();
}

function removeUsername(index) {
  usernames.splice(index, 1);
  updateList();
  sendUpdate();
}

function sendUpdate() {
  fetch("YOUR_REPLIT_API_URL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usernames })
  }).then(res => res.text())
    .then(msg => console.log(msg));
}
