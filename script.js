const words = [
  {hanzi: "你", pinyin: "nǐ", meaning: "bạn", story: "👋 Khi chào ai đó, bạn nói 'nǐ hǎo'", example: "你好！<br>Nǐ hǎo! (Xin chào!)"},
  {hanzi: "我", pinyin: "wǒ", meaning: "tôi", story: "💬 Dùng khi nói về bản thân.", example: "我是学生。<br>Wǒ shì xuéshēng. (Tôi là học sinh.)"},
  {hanzi: "爱", pinyin: "ài", meaning: "yêu", story: "❤️ Bộ tâm (心) chỉ cảm xúc.", example: "我爱你。<br>Wǒ ài nǐ. (Tôi yêu bạn.)"},
  {hanzi: "学", pinyin: "xué", meaning: "học", story: "📚 Có bộ tử (子) – tượng trưng cho trẻ em học hành.", example: "我在学习汉语。<br>Wǒ zài xuéxí Hànyǔ. (Tôi đang học tiếng Trung.)"},
  {hanzi: "好", pinyin: "hǎo", meaning: "tốt, hay, đẹp", story: "👩‍👧 Bộ nữ (女) và tử (子) tạo nên nghĩa tốt lành.", example: "很好！<br>Hěn hǎo! (Rất tốt!)"},
  {hanzi: "谢谢", pinyin: "xièxie", meaning: "cảm ơn", story: "🙏 Biểu lộ sự biết ơn.", example: "谢谢你！<br>Xièxie nǐ! (Cảm ơn bạn!)"},
  {hanzi: "汉语", pinyin: "Hànyǔ", meaning: "tiếng Trung", story: "🈶 'Hán' chỉ người Hán, 'Ngữ' là ngôn ngữ.", example: "我会说汉语。<br>Wǒ huì shuō Hànyǔ. (Tôi biết nói tiếng Trung.)"}
];

let current = 0;
const hanzi = document.getElementById('hanzi');
const pinyin = document.getElementById('pinyin');
const meaning = document.getElementById('meaning');
const story = document.getElementById('story');
const example = document.getElementById('example');
const dialogue = document.getElementById('dialogue');

function updateCard() {
  const w = words[current];
  hanzi.innerHTML = w.hanzi;
  pinyin.innerHTML = w.pinyin;
  meaning.innerHTML = w.meaning;
  story.innerHTML = w.story;
  example.innerHTML = w.example;
}

document.getElementById('prevBtn').onclick = () => {
  current = (current - 1 + words.length) % words.length;
  updateCard();
};

document.getElementById('nextBtn').onclick = () => {
  current = (current + 1) % words.length;
  updateCard();
};

document.getElementById('speakBtn').onclick = () => {
  const msg = new SpeechSynthesisUtterance(words[current].pinyin);
  msg.lang = "zh-CN";
  speechSynthesis.speak(msg);
};

document.getElementById('generateBtn').onclick = () => {
  const used = words.sort(() => Math.random() - 0.5).slice(0, 4);
  dialogue.innerHTML = `
    👧 A: ${used[0].hanzi} ${used[1].hanzi}？(${used[0].pinyin} ${used[1].pinyin}?)<br>
    🧒 B: ${used[2].hanzi}${used[3].hanzi}！(${used[2].pinyin}${used[3].pinyin}!)<br><br>
    🇻🇳 Dịch: ${used[0].meaning} ${used[1].meaning}? → ${used[2].meaning}${used[3].meaning}!
  `;
};

updateCard();
