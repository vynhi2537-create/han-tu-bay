let cards = [
  {
    hanzi: "你好",
    pinyin: "nǐ hǎo",
    vietnamese: "Xin chào",
    mnemonic: "Gặp bạn thì phải tốt với nhau",
    reward: "👋"
  },
  {
    hanzi: "谢谢",
    pinyin: "xièxie",
    vietnamese: "Cảm ơn",
    mnemonic: "Hai chữ giống nhau, dễ thương",
    reward: "🙏"
  }
];
let currentCardIndex = 0;
let isFlipped = false;
let correctPinyin = "";

function renderCard() {
  const card = cards[currentCardIndex];
  document.getElementById("displayHanzi").textContent = card.hanzi;
  document.getElementById("displayPinyin").textContent = card.pinyin;
  document.getElementById("displayVietnamese").textContent = card.vietnamese;
  document.getElementById("displayMnemonic").textContent = card.mnemonic;
  document.getElementById("cardInner").classList.remove("flipped");
  isFlipped = false;
  document.getElementById("conversationDisplay").classList.add("hidden");
  document.getElementById("practiceArea").classList.add("hidden");
}
function flipCard() {
  document.getElementById("cardInner").classList.toggle("flipped");
  isFlipped = !isFlipped;
}
function nextCard
