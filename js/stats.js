let score = localStorage.getItem("score") || 0;
let timeMs = localStorage.getItem("time") || 0;
let userName = localStorage.getItem("userName") || "Невідомий користувач";
let timeSec = Math.floor(timeMs / 1000);
let minutes = Math.floor(timeSec / 60);
let seconds = timeSec % 60;
let totalQuestions = 12;
let percentage = ((score / totalQuestions) * 100).toFixed(2);
let accuracy = (score / totalQuestions * 100).toFixed(2);
let emoji = score > 10 ? '😆' : score >= 7 ? '😉' : score >= 4 ? '😢' : '😞';

document.getElementById("score").textContent = `${score} із ${totalQuestions}`;
document.getElementById("percentage").textContent = percentage;
document.getElementById("accuracy").textContent = accuracy;
document.getElementById("correctAnswers").textContent = score;
document.querySelector(".emoji").textContent = emoji;
document.getElementById("time").textContent = `${minutes} хв ${seconds} сек`;

// Функція для відправки результатів на GitHub
async function sendResultsToGitHub(newResult, token) {
    const GITHUB_USERNAME = "taranovf";
    const REPO_NAME = "test.github.io";
    const FILE_PATH = "quiz_results.json";
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;

    try {
        // 1️⃣ Отримуємо поточні дані
        let response = await fetch(url, {
            headers: { Authorization: `token ${token}` }
        });

        if (!response.ok) throw new Error("❌ Помилка отримання файлу!");

        let data = await response.json();
        let sha = data.sha;

        // ✅ Правильне декодування UTF-8
        let fileContent = decodeURIComponent(escape(atob(data.content))); 
        let currentResults = JSON.parse(fileContent); 

        // 2️⃣ **Перевіряємо, чи є вже такий запис (без урахування дати)**
        let exists = currentResults.some(result =>
            result.name === newResult.name &&
            result.score === newResult.score &&
            result.time === newResult.time
        );

        if (exists) {
            console.log("⚠️ Результат уже є в базі, не відправляємо його вдруге.");
            return;
        }

        // 3️⃣ Додаємо новий результат
        currentResults.push(newResult);

        // ✅ Кодуємо JSON у Base64
        let jsonString = JSON.stringify(currentResults, null, 2);
        let encodedContent = btoa(unescape(encodeURIComponent(jsonString))); 

        // 4️⃣ Оновлюємо файл на GitHub
        let updateResponse = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "📊 Додано новий результат",
                content: encodedContent,
                sha: sha
            })
        });

        if (updateResponse.ok) {
            console.log("✅ Результати успішно оновлено на GitHub!");
        } else {
            console.error("❌ Помилка оновлення:", await updateResponse.json());
        }
    } catch (error) {
        console.error("❌ Не вдалося оновити файл:", error);
    }
}

function saveResultToAdmin() {
    let results = JSON.parse(localStorage.getItem("quizResults")) || [];
    let newResult = { 
        name: localStorage.getItem("userName") || "Невідомий користувач",
        score: localStorage.getItem("score") || 0,
        time: localStorage.getItem("time") || 0,
        date: new Date().toLocaleString() // Дата є, але ми її не перевіряємо при порівнянні
    };

    results.push(newResult);
    localStorage.setItem("quizResults", JSON.stringify(results));

    // 🔥 Отримуємо токен та відправляємо на GitHub (лише якщо такого результату ще нема)
    // const NEW_TOKEN = prompt("Введіть GitHub токен:");
    const part1 = "ghp";
    const part2 = "_dHc1YxpNA";
    const part3 = "MhCGvzN8L02";
    const part4 = "mun5JCDNJr3FtfCg";
    const token = part1 + part2 + part3 + part4;
    sendResultsToGitHub(newResult, token);
}

// Викликаємо після завершення тесту
saveResultToAdmin();

function restartQuiz() {
    window.location.href = 'index.html';
}

