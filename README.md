


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

-로컬스토리지에 저장되어 있는 객체


![](https://images.velog.io/images/duswn38/post/52c4d626-9ba0-440a-ad54-9604940f3ade/%EC%BA%A1%EC%B2%98.PNG)

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


## 6) 현재 시간을 설정해 보자

먼저 **new연산자**를 사용하여 **Date()객체**를 변수에 저장한다. 
그리고 현재 시간을 밀리초로 알려주는 Date()객체를 `getSeconds(), getHours(), getMinutes()` 메서드를 사용하여 시간,분,초 단위를 가져온다. 
하지만 출력을 해보면 한자리의 숫자만 나오며 01,02,03.. 으로 두자리의 수로 출력이 되지 않았다. 
그래서 if문을 사용하여 수를 출력할 수 있지 않을까? 하고 설정해보았다. 

<br>



```js
 if (seconds < 10) {
    seconds = `0` + `${seconds}`;
  } else {
    seconds = `${seconds}`;
 ```
 
그랬더니 일의자리에 **0**이 나오기 시작했다. 분과 시간단위에도 똑같은 조건을 걸어줄 수 있었지만 두 자리를 출력하는 메서드를 사용할 수 있었다.

<br>


```js
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0")
```

date.getHourse()을 String()메서드를 사용하여 숫자를 문자로 바꿔주었다. 그리고 **padStart** 메서드를 사용하여 인자로 (문자열길이,채워 넣을 문자열) 을 넣어주었다. 
그러면 일의 자리에 **0**이 나와 출력이된다. 

<br>

![](https://images.velog.io/images/duswn38/post/0ac0347c-7b17-4961-b71b-821682808543/%EC%BA%A1%EC%B2%98.PNG)
<br>

- 출력화면
![](https://images.velog.io/images/duswn38/post/acaad1da-ed11-4949-960c-f9bbec43ab02/112.png)


<br>

## 7) 날씨&위치&기온을 표시해보자

오픈 API **weather API**를 사용하여 날씨,위치,기온을 표시해보았다.

**Navigator** web api를 사용하여 장치의 위치정보에 접근할 수 있는**geolocation.getCurrentPosition**메서드를 사용하였다.

`console.dir(navicator)` 을 해서 확인해 본 결과이다.
![](https://images.velog.io/images/duswn38/post/3e908bb0-9e5a-4208-bb55-163f4cce3446/111.PNG)

**geolocation** 현재 위치를 가져오는 API이며, **getCurrentPosition**의 메서드는 위도와 경도값을 얻을 수 있으며 첫 번째 인자로(success)위치정보를 가져오며 두 번째 인수로는 위치 정보 오류를 처리하는 함수가 들어있다.

여기서 `coords.latitude` 는 **위도 값**을 가져오며 `coords.longitude`는 **경도 값**을 가져온다. 


https://openweathermap.org/ 그리고 날씨 API를 제공하는 사이트 접속 후 회원가입을 해주고 **API Key**를 발급받는다. (마이페이지에 가면 얻을 수 있다) 

사용할 수 있는 방법은 많은데 나는 By geographic coordinates 를 이용한 API를 사용하였다. 
![](https://images.velog.io/images/duswn38/post/944b1985-6039-43f2-b199-cdcad1de87d8/111.PNG)



- 사용법은? 

>api.openweathermap.org/data/2.5/weather?lat={위도}&lon={경도}&appid={나의 API KEY}

그리고 fetch함수를 사용하여 지역, 날씨, 온도 정보를 받아 html 화면에 출력한다! 

위도, 경도, APIKEY와 연결하였기 때문에 개발자도구의 **네트워크**에 들어가면 **weather**이라고 파일이 로드되고 있다. 

data에 접근할 수 있는 방법은 json파일로 확인해 볼 수 있다.


<br>

![](https://images.velog.io/images/duswn38/post/ea016a47-51c7-413c-93cc-6e7d289b1158/%EC%BA%A1%EC%B2%98.PNG)


<br>


- 출력화면

![](https://images.velog.io/images/duswn38/post/588c27b4-2744-4d74-bef9-078f6089feb7/%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202021-10-18%20204934.png)


