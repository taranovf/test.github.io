let score = localStorage.getItem("score") || 0;
let timeMs = localStorage.getItem("time") || 0;
let userName = localStorage.getItem("userName") || "Невідомий користувач";
let timeSec = Math.floor(timeMs / 1000);
let minutes = Math.floor(timeSec / 60);
let seconds = timeSec % 60;
let totalQuestions = 12;
let percentage = ((score / totalQuestions) * 100).toFixed(2);
let accuracy = (score / totalQuestions * 100).toFixed(2);
let emoji = score > 10 ? '😊' : score >= 7 ? '😐' : '😢';

document.getElementById("score").textContent = `${score} із ${totalQuestions}`;
document.getElementById("percentage").textContent = percentage;
document.getElementById("accuracy").textContent = accuracy;
document.getElementById("correctAnswers").textContent = score;
document.querySelector(".emoji").textContent = emoji;
document.getElementById("time").textContent = `${minutes} хв ${seconds} сек`;

// Зберігаємо результат у localStorage для адмін-панелі
function saveResultToAdmin() {
    let results = JSON.parse(localStorage.getItem("quizResults")) || [];
    results.push({ name: userName, score, time: timeMs, date: new Date().toLocaleString() });
    localStorage.setItem("quizResults", JSON.stringify(results));
}

// Викликаємо збереження після тесту
saveResultToAdmin();

function restartQuiz() {
    window.location.href = 'index.html';
}
