// const goLogin = document.querySelector("loginForm");
const loginInput = document.querySelector(".loginForm input");
const loginForm = document.querySelector(".loginForm");
const greeting = document.querySelector("#greeting");

const localUser = localStorage.getItem("userName");
if (localUser === null) {
  loginForm.classList.remove("hidden");
  loginForm.addEventListener("submit", handleClick);
} else {
  painting(localUser);
  // greeting.classList.remove("hidden");
  // greeting.innerText = "Hello, " + localUser;
}

function painting(username) {
  greeting.classList.remove("hidden");
  greeting.innerText = `Hello, ${username}`;
}

function handleClick(event) {
  const userBlah = loginInput.value;
  event.preventDefault();
  localStorage.setItem("userName", userBlah);
  loginForm.classList.add("hidden");
  painting(userBlah);
  // greeting.innerText = "Hello, " + userBlah;
  // greeting.classList.remove("hidden");
}
