// const previous = localStorage.getItem("users");
// const users = previous ? JSON.parse(previous) : [];
// console.log(users);
// function adduser() {
//   const username = prompt("Add your username")?.trim();
//   const balance = +prompt("Add your balance");

//   if (!!username && !isNaN(balance) && balance > 0) {
//     const newUser = {
//       username: username,
//       id: crypto.randomUUID(),
//       account: crypto.randomUUID(),
//       balance: parseFloat(balance),
//     };
//     users.push(newUser);
//     localStorage.setItem("users", JSON.stringify(users));
//     displayUsers();
//   } else {
//     alert(
//       `Failed to get Data: invalid data or account or balance is not number`
//     );
//   }
// }

// const getCardItem = (name, account, balance, id) => {
//   const template = `
//       <div class="user">
//       <h3>Username: ${name}</h3>
//       <p>Account: ${account}</p>
//       <p>Balance: ${balance}</p>
//     <div class="btns">
//     <button class="button" id="delete" onclick="removeUser('${id}')">Delete</button>
//     <button class="button" id="edit" onclick="editUser(${id})">Edit</button>
//     <button class="button" id="deposit" onclick="deposit(${id})">Deposit</button>
//     <button class="button" id="withdraw" onclick="withdraw(${id})">Withdraw</button>
//     </div>
//       </div>
//  `;
//   return template;
// };

// function displayUsers() {
//   const cardContainer = document.getElementById("data");
//   const oldUsers = localStorage.getItem("users");
//   // console.log(oldUsers);
//   const storedUsers = oldUsers ? JSON.parse(oldUsers) : [];

//   cardContainer.innerHTML = storedUsers
//     .map(({ username: name, balance, id, account }) => {
//       return getCardItem(name, account, balance, id);
//     })
//     .join("");
// }

// function withdraw(userId) {
//   const user = users.find((item) => item.id === userId);

//   if (user) {
//     const withdrawAmount = +prompt("Enter your withdraw amount");
//     if (
//       !isNaN(withdrawAmount) &&
//       withdrawAmount > 0 &&
//       user.balance >= withdrawAmount
//     ) {
//       user.balance -= withdrawAmount;
//       localStorage.setItem("users", JSON.stringify(users));
//       alert(`Withdraw ${withdrawAmount} successful`);
//       displayUsers();
//     } else {
//       alert(`Withdraw failed: insufficient balance or invalid amount`);
//     }
//   }
// }

// function deposit(userId) {
//   const user = users.find((user) => user.id === userId);

//   if (user) {
//     const depositAmount = parseFloat(prompt("Enter your deposit amount"));
//     if (!isNaN(depositAmount) && depositAmount > 0) {
//       user.balance += depositAmount;
//       localStorage.setItem("users", JSON.stringify(users));
//       displayUsers();
//     } else {
//       alert(`Your deposit amount is ${depositAmount} invalid`);
//     }
//   }
// }

// function editUser(userId) {
//   console.log(userId);
//   const user = users.find((user) => user.id === userId);

//   if (user) {
//     const updatedName = prompt("Enter new username:");

//     if (updatedName !== null && updatedName.trim() !== "") {
//       user.username = updatedName;
//       localStorage.setItem("users", JSON.stringify(users));
//       displayUsers();
//     }
//   }
// }

// function removeUser(userId) {
//   const result = users.filter((user) => user.id !== userId);
//   localStorage.setItem("users", JSON.stringify(result));

//   displayUsers();
// }

// const addbtn = document.getElementById("add");
// addbtn.onclick = function () {
//   adduser();
//   displayUsers();
// };

// displayUsers();

const getUpdatedUsers = () => {
  const oldUsers = localStorage.getItem("users");
  const storedUsers = oldUsers ? JSON.parse(oldUsers) : [];
  return storedUsers;
};

function addUser() {
  const username = prompt("Add your username")?.trim();
  const balance = +prompt("Add your balance");

  const storedUsers = getUpdatedUsers();

  if (!!username && !isNaN(balance) && balance > 0) {
    const newUser = {
      username: username,
      id: crypto.randomUUID(),
      account: crypto.randomUUID(),
      balance: parseFloat(balance),
    };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    displayUsers();
  } else {
    alert(
      `Failed to get Data: invalid data or account or balance is not number`
    );
  }
}

function displayUsers() {
  const cardContainer = document.getElementById("cards-container");

  const storedUsers = getUpdatedUsers();
  cardContainer.innerHTML = storedUsers
    .map((user) => getCardItem(user))
    .join("");
}

function withdraw(userId) {
  const users = getUpdatedUsers();
  const user = users.find((item) => item.id === userId);

  if (user) {
    const withdrawAmount = +prompt("Enter your withdraw amount");
    if (
      !isNaN(withdrawAmount) &&
      withdrawAmount > 0 &&
      user.balance >= withdrawAmount
    ) {
      user.balance -= withdrawAmount;
      localStorage.setItem("users", JSON.stringify(users));
      alert(`Withdraw ${withdrawAmount} successful`);
      displayUsers();
    } else {
      alert(`Withdraw failed: insufficient balance or invalid amount`);
    }
  }
}

function deposit(userId) {
  const users = getUpdatedUsers();
  const user = users.find((user) => user.id === userId);

  if (user) {
    const depositAmount = parseFloat(prompt("Enter your deposit amount"));
    if (!isNaN(depositAmount) && depositAmount > 0) {
      user.balance += depositAmount;
      localStorage.setItem("users", JSON.stringify(users));
      displayUsers();
    } else {
      alert(`Your deposit amount is ${depositAmount} invalid`);
    }
  }
}

function editUser(userId) {
  const users = getUpdatedUsers();
  const user = users.find((user) => user.id === userId);

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
  const users = getUpdatedUsers();
  const result = users.filter((user) => user.id !== userId);

  localStorage.setItem("users", JSON.stringify(result));

  displayUsers();
}

function getCardItem(user) {
  const { username: name, balance, id, account } = user;
  return `
      <div class="user">
      <h3>Username: ${name}</h3>
      <p>Account: ${account}</p>
      <p>Balance: ${balance}</p>
    <div class="btns">
    <button class="button" id="delete" onclick="removeUser('${id}')">Delete</button>
    <button class="button" id="edit" onclick="editUser('${id}')">Edit</button>
    <button class="button" id="deposit" onclick="deposit('${id}')">Deposit</button>
    <button class="button" id="withdraw" onclick="withdraw('${id}')">Withdraw</button>
    </div>
      </div>
 `;
}

const addBtn = document.getElementById("add");

addBtn.onclick = addUser;

displayUsers();
