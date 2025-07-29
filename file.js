const users = [
  {
    id: 1,
    account: 1,
    username: "Shahzad Ashraf",
    balance: 0,
    deposit: 0,
    withdraw: 0,
  },
  {
    id: 2,
    account: 2,
    username: "Wasif Ali",
    balance: 2000,
    deposit: 0,
    withdraw: 0,
  },
  {
    id: 3,
    account: 3,
    username: "Ahmad",
    balance: 200,
    deposit: 0,
    withdraw: 0,
  },
];

function adduser() {
  const username = prompt("Add your username");
  const account = prompt("Add your accout number");
  const balance = prompt("Add your balance");
  if (
    (username !== null && username.trim() !== "",
    account !== null && account.trim() !== "" && account !== users.account,
    balance !== null && balance.trim() !== "" && balance >= 0)
  ) {
    return {
      username: username,
      id: users.length ? users[users.length - 1].id + 1 : 1,
      account: account,
      balance: balance,
    };
  } else {
    alert(
      `Failed to get Data: invalid data or account or balance is not number`
    );
  }
}

function add(user) {
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

const addbtn = document.getElementById("add");
addbtn.onclick = function () {
  const newUser = adduser();
  add(newUser);
  displayUsers();
};

function displayUsers() {
  //   const user = document.getElementById("data");
  //  const allusers = localStorage.getItem('users')
  //  const users = JSON.parse(allusers)
  // user.innerHTML = users.
  const user = document.getElementById("data");
  const storedUsers = JSON.parse(localStorage.getItem("users"));
  console.log(users);
  console.log(storedUsers);
  user.innerHTML = storedUsers
    .map((user) => {
      return `
      <div class="user">
      <h3>Username: ${user.username}</h3>
      <p>Account: ${user.account}</p>
      <p>Balance: ${user.balance}</p>
    <div class="btns">
    <button class="button" id="delete" onclick="removeUser(${user.id})">Delete</button>
    <button class="button" id="edit" onclick="editUser(${user.id})">Edit</button>
    <button class="button" id="deposit" onclick="deposit(${user.id})">Deposit</button>
    <button class="button" id="withdraw" onclick="withdraw(${user.id})">Withdraw</button>
    </div>
      </div>
 `;
    })
    .join("");
}
displayUsers();

function withdraw(userId) {
  const user = users.find((item) => item.id === userId);
  localStorage.setItem("users", JSON.stringify(users));
  if (user) {
    const withdrawAmount = parseFloat(prompt("Enter your withdraw amount"));
    if (
      withdrawAmount !== null &&
      withdrawAmount >= 0 &&
      user.balance >= withdrawAmount
    ) {
      user.balance -= withdrawAmount;
      localStorage.setItem("users", JSON.stringify(users));
      alert(`Withdraw ${withdrawAmount} successful`);
    } else {
      alert(`Withdraw failed: insufficient balance or invalid amount`);
    }
  }
  displayUsers();
}

function deposit(userId) {
  const user = users.find((user) => user.id === userId);
  localStorage.setItem("users", JSON.stringify(users));
  if (user) {
    const depositAmount = parseFloat(prompt("Enter your deposit amount"));
    if (depositAmount !== null && depositAmount >= 0) {
      user.balance += depositAmount;
      localStorage.setItem("users", JSON.stringify(users));
      displayUsers();
    } else {
      alert(`Your deposit amount is ${depositAmount} invalid`);
    }
  }
}

function editUser(userId) {
  const user = users.find((user) => user.id === userId);
  localStorage.setItem("users", JSON.stringify(users));
  if (user) {
    const updatedName = prompt("Enter new username:");

    if (updatedName !== null && updatedName.trim() !== "") {
      user.username = updatedName;
localStorage.setItem("users", JSON.stringify(users));
      displayUsers();
    }
  }
}

function removeUser(userId) {
  const i = users.findIndex((user) => user.id === userId);
  if (i !== -1) {
    users.splice(i, 1);
    localStorage.setItem("users", JSON.stringify(users));
  }
  displayUsers();
}
