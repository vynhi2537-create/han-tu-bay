const flashcards = [
  { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Xin chào", mnemonic: "Dễ nhớ: 'nỉ hảo' — cách chào thân mật", emoji: "👋" },
  { hanzi: "谢谢", pinyin: "xièxie", meaning: "Cảm ơn", mnemonic: "Giống như 'xie xie' — nói 2 lần để lịch sự", emoji: "🙏" },
  { hanzi: "再见", pinyin: "zàijiàn", meaning: "Tạm biệt", mnemonic: "Nghĩa đen: 'gặp lại'", emoji: "👋" },
  { hanzi: "学习", pinyin: "xuéxí", meaning: "Học tập", mnemonic: "Học (学) + Thực hành (习)", emoji: "📖" },
  { hanzi: "朋友", pinyin: "péngyǒu", meaning: "Bạn bè", mnemonic: "Hai người (友) thành bạn", emoji: "🤝" }
];

let currentIndex = 0;

function renderCard() {
  const card = flashcards[currentIndex];
  document.getElementById("hanzi").textContent = card.hanzi;
  document.getElementById("pinyin").textContent = card.pinyin;
  document.getElementById("meaning").textContent = card.meaning;
  document.getElementById("mnemonic").textContent = card.mnemonic;
  document.getElementById("emoji").textContent = card.emoji;
}
renderCard();

function flipCard() {
  document.getElementById("flashcard").classList.toggle("flipped");
}

function nextCard() {
  currentIndex = (currentIndex + 1) % flashcards.length;
  renderCard();
}

function prevCard() {
  currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
  renderCard();
}

function speakWord() {
  const word = flashcards[currentIndex].hanzi;
  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = "zh-CN";
  speechSynthesis.speak(utter);
}

// 🎁 Emoji thưởng sau khi làm đúng
function rewardEmoji() {
  const emoji = document.getElementById("emoji");
  emoji.classList.remove("hidden");
  setTimeout(() => emoji.classList.add("hidden"), 2000);
}

// 🤖 AI tạo hội thoại (sử dụng API Gemini)
async function generateDialogue() {
  const words = flashcards.map(f => f.hanzi);
  const prompt = `Tạo một đoạn hội thoại ngắn (2-3 câu) bằng tiếng Trung, dùng các từ: ${words.join(", ")}.
  Viết kèm Pinyin và bản dịch tiếng Việt.`;
  
  document.getElementById("dialogue").textContent = "⏳ Đang tạo hội thoại bằng AI...";

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateText?key=YOUR_API_KEY", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "Lỗi khi tạo hội thoại.";
    document.getElementById("dialogue").innerHTML = result.replace(/\n/g, "<br>");
  } catch (err) {
    document.getElementById("dialogue").textContent = "❌ Lỗi kết nối AI.";
  }
}
