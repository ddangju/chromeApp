const quotes = [
  { quote: "가", author: "디즈니" },
  { quote: "간식은 언제나 맛있다", author: "코지" },
  { quote: "밥은 먹고 다니냐", author: "멍멍이" },
  { quote: "개껌은 없어서 못먹는다", author: "진돌이" },
  { quote: "마포대교는 무너졌다 이 새끼야", author: "곽철용이" },
  { quote: "이러다 우리 다~ 죽어!", author: "1번" },
  { quote: "오징어게임", author: "1등은 이정재" },
  { quote: "어차피 우승은 송민호", author: "블랙넛" },
  { quote: "배고프다", author: "김연주" },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

// console.log(quotes[0 - 9]);

const today = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = today.quote;
author.innerText = today.author;
