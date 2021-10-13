const todoForm = document.getElementById("todoList");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo");
const toDos = [];

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
  saveTodo();
  //비워지기전에 inputValue읙 값을 함수 인자로 넣어준다.
}

todoForm.addEventListener("submit", handleSubmit);
