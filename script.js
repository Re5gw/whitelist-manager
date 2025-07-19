async function loadUsernames() {
  const response = await fetch('whitelist.json');
  const usernames = await response.json();
  updateList(usernames);
}

function updateList(usernames) {
  const list = document.getElementById('userList');
  list.innerHTML = '';
  usernames.forEach((name, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${name}
      <button onclick="deleteUsername(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function addUsername() {
  const input = document.getElementById('usernameInput');
  const newName = input.value.trim();
  if (!newName) return;
  const response = await fetch('whitelist.json');
  const usernames = await response.json();
  if (usernames.includes(newName)) {
    alert("Username already in list.");
    return;
  }
  usernames.push(newName);
  saveUsernames(usernames);
  input.value = '';
}

async function deleteUsername(index) {
  const response = await fetch('whitelist.json');
  const usernames = await response.json();
  usernames.splice(index, 1);
  saveUsernames(usernames);
}

function saveUsernames(usernames) {
  const blob = new Blob([JSON.stringify(usernames, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'whitelist.json';
  a.click();
  URL.revokeObjectURL(url);
  alert("Downloaded updated whitelist.json. Please upload it manually to GitHub.");
  location.reload();
}

loadUsernames();
