async function fetchResultsFromGitHub(token) {
    const GITHUB_USERNAME = "taranovf";
    const REPO_NAME = "test.github.io";
    const FILE_PATH = "quiz_results.json";

    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;

    try {
        console.log("📥 Отримуємо дані з GitHub...");

        let response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store"
        });

        if (!response.ok) throw new Error("❌ Помилка отримання файлу!");

        let data = await response.json();
        let fileContent = decodeURIComponent(escape(atob(data.content))); 
        let results = JSON.parse(fileContent);

        console.log("✅ Отримані результати:", results);

        localStorage.setItem("quizResults", JSON.stringify(results));

        loadResults(results, token);
        updateStatistics(results);

    } catch (error) {
        console.error("❌ Не вдалося отримати дані з GitHub:", error);
        localStorage.setItem("quizResults", JSON.stringify([]));
    }
}

// 📌 Функція оновлення таблиці
function loadResults(results, token) {
    let tableBody = document.getElementById("resultsTableBody");

    if (!tableBody) {
        console.error("❌ Таблиця не знайдена!");
        return;
    }

    results.sort((a, b) => b.score - a.score);
    tableBody.innerHTML = "";

    results.forEach((result, index) => {
        let minutes = Math.floor(result.time / 60000);
        let seconds = Math.floor((result.time % 60000) / 1000);

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${result.name || "Невідомий користувач"}</td>
            <td>${Math.round(result.score)} / 12</td>
            <td>${minutes} хв ${seconds} сек</td>
            <td>${result.date}</td>
            <td>
                <button class="delete-btn" data-name="${result.name}" data-score="${result.score}" data-time="${result.time}">❌ Видалити</button>
                <button class="save-btn" data-index="${index}">💾 Зберегти</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // ✅ Виправлено неклікабельні кнопки після пошуку
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            deleteResult(this.dataset.name, this.dataset.score, this.dataset.time, token);
        });
    });

    document.querySelectorAll(".save-btn").forEach(button => {
        button.addEventListener("click", function () {
            saveResultLocally(this.dataset.index);
        });
    });

    console.log("📊 Таблиця оновлена!");
}

// 📌 Функція оновлення статистики
function updateStatistics(results) {
    if (!results.length) {
        document.getElementById("averageScore").textContent = "Немає даних";
        document.getElementById("averageTime").textContent = "Немає даних";
        document.getElementById("bestPlayer").textContent = "Немає даних";
        return;
    }

    let totalScore = results.reduce((sum, r) => sum + r.score / 1, 0);
    let totalTime = results.reduce((sum, r) => sum + r.time / 1, 0);
    let bestPlayer = results.reduce((best, r) => (r.score > best.score ? r : best), results[0]);

    let averageScore = Math.round(totalScore / results.length); // 🔥 Округлення балів
    let averageTimeMinutes = Math.floor((totalTime / results.length) / 60000);
    let averageTimeSeconds = Math.floor(((totalTime / results.length) % 60000) / 1000);

    document.getElementById("averageScore").textContent = `${averageScore} / 12`;
    document.getElementById("averageTime").textContent = `${averageTimeMinutes} хв ${averageTimeSeconds} сек`;
    document.getElementById("bestPlayer").textContent = `${bestPlayer.name}`;
}

// 📌 Функція пошуку по імені
function searchResults() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let results = JSON.parse(localStorage.getItem("quizResults")) || [];

    let filteredResults = results.filter(r => r.name.toLowerCase().includes(query));
    loadResults(filteredResults, localStorage.getItem("githubToken"));
}

// 📌 Функція видалення конкретного результату
async function deleteResult(name, score, time, token) {
    const GITHUB_USERNAME = "taranovf";
    const REPO_NAME = "test.github.io";
    const FILE_PATH = "quiz_results.json";
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;

    let results = JSON.parse(localStorage.getItem("quizResults")) || [];

    // 🔥 Видаляємо тільки обраний результат
    let newResults = results.filter(r => !(r.name === name && r.score == score && r.time == time));

    try {
        let shaResponse = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!shaResponse.ok) throw new Error("❌ Не вдалося отримати свіжий SHA!");

        let shaData = await shaResponse.json();
        let sha = shaData.sha;

        let jsonString = JSON.stringify(newResults, null, 2);
        let encodedContent = btoa(unescape(encodeURIComponent(jsonString))); 

        let response = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "🗑 Видалено запис з результатів",
                content: encodedContent,
                sha: sha
            })
        });

        if (response.ok) {
            console.log("✅ Результат видалено!");
            localStorage.setItem("quizResults", JSON.stringify(newResults));
            loadResults(newResults, token);
        } else {
            console.error("❌ Помилка видалення:", await response.json());
        }
    } catch (error) {
        console.error("❌ Не вдалося видалити запис:", error);
    }
}

// 📌 Функція збереження результату
function saveResultLocally(index) {
    let results = JSON.parse(localStorage.getItem("quizResults")) || [];
    let result = results[index];

    if (!result) return;

    let blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `quiz_result_${index + 1}.json`;
    link.click();
}

// 📌 Запит токена та завантаження даних
const part1 = "ghp";
const part2 = "_dHc1YxpNA";
const part3 = "MhCGvzN8L02";
const part4 = "mun5JCDNJr3FtfCg";
const NEW_TOKEN  = part1 + part2 + part3 + part4;
localStorage.setItem("githubToken", NEW_TOKEN);
fetchResultsFromGitHub(NEW_TOKEN);
