


![](https://images.velog.io/images/duswn38/post/0eac1388-1503-44c4-a936-ccae6cb997a1/11.png)

>자바스크립트랑 더 친해지기 위해 바닐라 자바스크립트로 프로젝트를 진행해보기로 하였다

## 📃 기간은? 5일

## 💫 목표는? 
- 기본적으로 사용하는 함수작동방식 메서드사용 그리고 webApi를 익히기 위해 토이프로젝트를 진행하였다. 
## ⚙ 무엇을 구현하였나? 
- 로컬스토리지를 통하여 추가, 삭제기능
- 현재 시각 표시
- 위도와 경도 api이용하여 지역과 현재온도 표시


## ✅ 구현상황

---

### 1) 파일 셋팅
- index.html body테그 안에 js를 위치 시켰다.
body 끝에 위치시킨 이유는 자바스크립트 파일이 커지면 브라우저가 html를 렌더하는 과정에서 느려질 수가 있어 먼저 html의 테그들을 다 읽고 js파일이 읽히도록 하였다. 



![](https://images.velog.io/images/duswn38/post/7abf75ef-3ea3-461d-9fed-e7079bc88f59/%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202021-10-18%20135418.png)

<br>

### 2) 내 이름을 입력해보자


localStorage에 값이 없다면 이름의 입력란에 **hidden:none** 테그를 지워 입력란이 출력된다.
이름을 입력하면 입력란은 다시 **hidden:none**이 추가되어 보이지 않게 되고 
사용자의 이름과 투두리스트의 입력이 보여진다. 




![](https://images.velog.io/images/duswn38/post/6e6523b6-e00e-44bc-9398-faad78f4d501/%EC%BA%A1%EC%B2%98.PNG)

<br>



- 출력화면
![](https://images.velog.io/images/duswn38/post/e3f868cd-2514-4646-8d0d-671d5f00435c/112.png)


<br>


### 3) TodoList를 입력해보자

투두리스트의 전체적인 흐름을 먼저 잡아보자면,
> 1. 사용자가 입력란에 오늘 할 일 입력
2. 입력한 순간 입력된 text가 빈 배열에 추가, html테그가 추가되어 화면에 그려짐, 로컬스토리지에 text로 저장한다. 
3. 리스트를 입력하면 아래로 나열된다. 

```js


function saveTodo() {
  localStorage.setItem("todo", JSON.stringify(toDos));
}

function handleClick(event) {
  const a = event.target.parentElement;
  console.log(a.parentElement);
  a.remove();
  console.log(a.parentElement);
  toDos = toDos.filter((item) => item.id !== parseInt(a.id));
  saveTodo();
}

function paintTodo(todo) {
  const list = document.createElement("li");
  list.id = todo.id;
  const span = document.createElement("span");
  span.className = "addList";
  span.innerText = todo.text;

  const btn = document.createElement("button");
  btn.innerText = "Delete";
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

}

todoForm.addEventListener("submit", handleSubmit);

const saved = localStorage.getItem("todo");

if (saved !== null) {
  const parseTodo = JSON.parse(saved);

  toDos = parseTodo;

  parseTodo.forEach(paintTodo);
}

```

<br>

- **handleSubmit**이 호출될때 
preventDefalut();를 호출하여 submit에 내장되어있는 새로고침을 막아준다. 그리고 사용자가 입력한 값을 newTodo 변수에 저장시키고 input창을 비워준다. 또 사용자가 입력한 값을 객체 형태로 ** text와 id**로 담아준다. 
**1. toDos.push(newObj)**
	빈 배열에 객체 형태로 push 메서드를 사용하여 추가한다. <br>
**2. paintTodo(newObj) **
	객체 형태를 paintTodo 인자에 담는다. 그리고 이 함수가 실행될 때 id와 text값을 받아 화면에 출력한다. <br>
**3. saveTodo(newTodo) **    
	input의 value값을 newTodo로 받아 로컬스토리지에 "todo"의 키값으로 저장한다. 저장된 값은 toDos배열에 객체 형태로 존재하며 JSON.Stringify() 메서드를 사용하여 그 배열을 스트링화한다.
    

    
    
    
<br>



- 출력화면


![](https://images.velog.io/images/duswn38/post/b5851c22-7cc4-4578-83d9-1a1e2269cd66/%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202021-10-18%20204934.png)


<br>


### 4) 배경화면을 랜덤으로 바꿔보자

img파일에 배경화면으로 설정할 이미지들을 추가한다. 

그리고 그 이미지들을 배열형태로 이미지파일 이름을 넣어준 후 **images**변수에 저장한다.

**images**를 랜덤으로 출력하는데 **images[Math.floor(Math.random() * images.length)]**  이 메서드를 사용한다. 

먼저 0부터 1구간에서 랜덤으로 수를 생성하는 난수생성 함수를 사용하는데 이것을 **images의 길이**만큼 생성한다.

그리고 소수단위로 나오는 것을 정수로 바꾸기 위해 **Math.floor()** 메서드를 사용한다. 

이 메서드는 작은 정수를 반환한다. 

그리고 바뀌는 images의 값을 **changeImg**에 담아 템플릿 리터럴로 img테그형태에 넣어준다! 

```js
<img src = "img/2.jpg" class="bg">

```

형태로 출력이 된다. 




```js
const images = ["1.jpg", "2.jpg", "3.jpg"];


const changeImg = images[Math.floor(Math.random() * images.length)];

// const bgImage = document.createElement("img");
//위 코드를 아래처럼 new Image()를 사용하여 테그를 추가할 수 있다! 

const bgImage = new Image();

bgImage.src = `img/${changeImg}`;

bgImage.className = "bg";

document.body.appendChild(bgImage);

```

<br>

#### 하지만 만약에 배경이미지가 3세개 아니라 50개,100개일 경우엔 어떻게 할까?

이 이미지들 이름을 전부 배열에 넣어줄 수가 없다. 그래서 for문을 사용해 보기로 했다. 

```js

const images = [];

for (let i = 1; i < 4; i++) {
  images.push(i + ".jpg");
  console.log(images);
}

const changeImg = images[Math.floor(Math.random() * images.length)];

// const bgImage = document.createElement("img");

const bgImage = new Image();

bgImage.src = `img/${changeImg}`;

console.log(bgImage.src, "gd");

bgImage.className = "bg";

document.body.appendChild(bgImage);

```

빈 배열을 **images** 변수에 넣어준다.

그리고 for문 **초기문**으로 1부터 images의 파일 수 만큼 반복을 돌린다고 작성해 주고 **실행문**에 빈 배열에 반복되는 조건마다 **+jpg**를 더해주었다.

그리고 위와 같이 랜덤으로 실행하는 메서드를 사용해준다. 

그럼 똑같이 실행이 된다! 

