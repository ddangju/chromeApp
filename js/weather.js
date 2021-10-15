//유저의 위치를 주는 함수

const API_KEY = "0aaf0108b5e2f7e5fbfd08bb6ed286b2";

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url).then((response) =>
    response.json().then((data) => {
      // console.log(data.main.temp);
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:nth-child(2)");
      const temp = document.querySelector("#weather span:last-child");
      city.innerText = data.name;
      weather.innerText = data.weather[0].main;
      temp.innerText = data.main.temp;
    })
  );
}

function error() {
  alert("실패");
}
navigator.geolocation.getCurrentPosition(success, error);
