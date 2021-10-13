const clock = document.getElementById("clock");
// const currentSe = date.getSeconds();

function getClock() {
  const date = new Date();
  let seconds = date.getSeconds();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (seconds < 10) {
    seconds = `0` + `${seconds}`;
  } else {
    seconds = `${seconds}`;
  }
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);
