let score = localStorage.getItem("score") || 0;
let timeMs = localStorage.getItem("time") || 0;
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

function restartQuiz() {
    localStorage.clear();
    window.location.href = 'index.html';
}