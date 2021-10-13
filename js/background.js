// const images = ["1.jpg", "2.jpg", "3.jpg"];

const images = [];

for (let i = 1; i < 4; i++) {
  images.push(i + ".jpg");
  console.log(images);
}

const changeImg = images[Math.floor(Math.random() * images.length)];

// const bgImage = document.createElement("img");

const bgImage = new Image();

bgImage.src = `img/${changeImg}`;

bgImage.className = "bg";

document.body.appendChild(bgImage);
