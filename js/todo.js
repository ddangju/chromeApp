const todoForm = document.getElementById("todoList");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo");
let toDos = [];

// function paintTodo(todo) {
//   const list = document.createElement("li");
//   const span = document.createElement("span");
//   const text = document.createTextNode(todo);

//   span.appendChild(text);
//   list.appendChild(span);

//   console.log(list);
//   todoList.append(list);
// }
function saveTodo(save) {
  console.log(save);
  localStorage.setItem("todo", JSON.stringify(toDos));
}

function handleClick(event) {
  const li = event.target.parentElement;
  li.remove();
}

function paintTodo(todo) {
  const list = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = todo;

  const btn = document.createElement("button");
  btn.innerText = "button";
  btn.addEventListener("click", handleClick);

  list.appendChild(span);
  list.appendChild(btn);
  todoList.appendChild(list);
}

function handleSubmit(e) {
  e.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  toDos.push(newTodo);
  paintTodo(newTodo);
  saveTodo(newTodo);
  //비워지기전에 inputValue읙 값을 함수 인자로 넣어준다.
}

todoForm.addEventListener("submit", handleSubmit);

const saved = localStorage.getItem("todo");

// function hello(item) {
//   console.log(item, "나함수");
// }

// console.log(saved, "1");
if (saved !== null) {
  const parseTodo = JSON.parse(saved);
  console.log(parseTodo, "리스트");
  toDos = parseTodo;
  // parseTodo.forEach(hello);
  // parseTodo.forEach((item) => console.log(typeof item, "나아이템"));
  parseTodo.forEach(paintTodo);
}

//1. 로컬스토리지에 접근하여 key의 값을 get한다.
//2. if문을 통하여 로컬스토리지에 key의 값이 존재하는지 확인을 하고
/// 존재한다면 string화 되어있는 배열을 parse해서 배열화를 해준다.
///3. array에있는 각각의 요소에 대해 function을 실행시킨다
