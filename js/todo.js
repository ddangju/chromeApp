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
function saveTodo() {
  // console.log(save);
  localStorage.setItem("todo", JSON.stringify(toDos));
}

function handleClick(event) {
  const a = event.target.parentElement;
  // console.log(li.id, "나li");
  console.log(a.parentElement);
  a.remove();
  console.log(a.parentElement);
  // console.log(a, 2);
  toDos = toDos.filter((item) => item.id !== parseInt(a.id));
  saveTodo();

  //삭제후 saveTodo함수 호출하면서
}

function paintTodo(todo) {
  // console.log(todo, "<<<<<<todo");
  const list = document.createElement("li");
  list.id = todo.id;
  // console.log(list);
  const span = document.createElement("span");
  span.innerText = todo.text;

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
  const newObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newObj);
  paintTodo(newObj);
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
  // console.log(parseTodo, "리스트");
  toDos = parseTodo;
  // parseTodo.forEach(hello);
  // parseTodo.forEach((item) => console.log(typeof item, "나아이템"));
  parseTodo.forEach(paintTodo);
}

//1. 로컬스토리지에 접근하여 key의 값을 get한다.
//2. if문을 통하여 로컬스토리지에 key의 값이 존재하는지 확인을 하고
/// 존재한다면 string화 되어있는 배열을 parse해서 배열화를 해준다.
///3. array에있는 각각의 요소에 대해 function을 실행시킨다
