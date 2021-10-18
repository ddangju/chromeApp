const loginInput = document.querySelector(".loginForm input");
const loginForm = document.querySelector(".loginForm");
const greeting = document.querySelector("#greeting");
const toDo = document.querySelector("#todoList");
const localUser = localStorage.getItem("userName");

if (localUser === null) {
  loginForm.classList.remove("hidden");
  toDo.classList.add("hidden");
  loginForm.addEventListener("submit", handleClick);
} else {
  painting(localUser);
}

function painting(username) {
  greeting.classList.remove("hidden");
  toDo.classList.remove("hidden");
  greeting.innerText = `Hello, ${username}`;
}

function handleClick(event) {
  const userBlah = loginInput.value;
  event.preventDefault();
  localStorage.setItem("userName", userBlah);
  loginForm.classList.add("hidden");
  painting(userBlah);
}
