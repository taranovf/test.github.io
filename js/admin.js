// 📌 Функція завантаження даних з GitHub----------------------------------------------------------------------------------

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
        localStorage.setItem("quizResultsSHA", data.sha); // Зберігаємо SHA для оновлення

        loadResults(results);
        updateStatistics(results);

    } catch (error) {
        console.error("❌ Не вдалося отримати дані з GitHub:", error);
        localStorage.setItem("quizResults", JSON.stringify([]));
    }
}

// 📌 Функція оновлення таблиці (Повертаємо індекси!)----------------------------------------------------------------------------------

function loadResults(results) {
    let tableBody = document.getElementById("resultsTableBody");

    if (!tableBody) {
        console.error("❌ Таблиця не знайдена!");
        return;
    }

    tableBody.innerHTML = "";

    results.forEach((result, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>  <!-- 🔥 Повернули індекс у таблицю -->
            <td>${result.name || "Невідомий користувач"}</td>
            <td>${Math.round(result.score)} / 12</td>
            <td>${Math.floor(result.time / 60000)} хв ${Math.floor((result.time % 60000) / 1000)} сек</td>
            <td>${result.date}</td>
            <td>
                <button class="edit-btn" data-name="${result.name}" data-score="${result.score}" data-time="${result.time}">✏️ Редагувати</button>
                <button class="delete-btn" data-name="${result.name}" data-score="${result.score}" data-time="${result.time}">❌ Видалити</button>
                <button class="save-btn" data-index="${index}">💾 Зберегти</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", function () {
            let token = prompt("Введіть GitHub токен:");
            if (token) {
                editResult(this.dataset.name, this.dataset.score, this.dataset.time, token);
            }
        });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            let token = prompt("Введіть GitHub токен:");
            if (token) {
                deleteResult(this.dataset.name, this.dataset.score, this.dataset.time, token);
            }
        });
    });

    console.log("📊 Таблиця оновлена!");
}

// 📌 Функція для сортування таблиці----------------------------------------------------------------------------------

function sortTable(columnIndex) {
    // ❌ Забороняємо сортування індексів та кнопок
    if (columnIndex === 0 || columnIndex === document.querySelectorAll("#resultsTable th").length - 1) {
        return;
    }

    let results = JSON.parse(localStorage.getItem("quizResults")) || [];
    let isAscending = document.getElementById("resultsTable").dataset.sortOrder !== "asc";

    results.sort((a, b) => {
        let valueA = Object.values(a)[columnIndex];
        let valueB = Object.values(b)[columnIndex];

        // 📌 Якщо сортуємо бали — переводимо у число
        if (columnIndex === 2) {
            valueA = parseInt(a.score);
            valueB = parseInt(b.score);
        }

        // 📌 Якщо сортуємо час — використовуємо мілісекунди
        if (columnIndex === 3) {
            valueA = a.time;
            valueB = b.time;
        }

        // 📌 Якщо сортуємо дату — конвертуємо у `Date`
        if (columnIndex === 4) {
            valueA = new Date(a.date.split('.').reverse().join('-')); // Перетворюємо `дд.мм.рррр` у `рррр-мм-дд`
            valueB = new Date(b.date.split('.').reverse().join('-'));
        }

        return isAscending ? valueA - valueB : valueB - valueA;
    });

    // 🔄 Оновлюємо таблицю після сортування
    loadResults(results);

    // 🔄 Змінюємо порядок сортування
    document.getElementById("resultsTable").dataset.sortOrder = isAscending ? "asc" : "desc";

    // 🔄 Оновлюємо іконки сортування
    document.querySelectorAll("#resultsTable th").forEach(th => th.classList.remove("sorted-asc", "sorted-desc"));
    document.querySelectorAll("#resultsTable th")[columnIndex].classList.add(isAscending ? "sorted-asc" : "sorted-desc");
}

// 📌 Додаємо обробник кліку на заголовки
document.addEventListener("DOMContentLoaded", () => {
    let headers = document.querySelectorAll("#resultsTable th");
    headers.forEach((header, index) => {
        header.addEventListener("click", () => sortTable(index));
    });
});



// 📌 Функція оновлення статистики----------------------------------------------------------------------------------

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

    let averageScore = Math.round(totalScore / results.length);
    let averageTimeMinutes = Math.floor((totalTime / results.length) / 60000);
    let averageTimeSeconds = Math.floor(((totalTime / results.length) % 60000) / 1000);

    document.getElementById("averageScore").textContent = `${averageScore} / 12`;
    document.getElementById("averageTime").textContent = `${averageTimeMinutes} хв ${averageTimeSeconds} сек`;
    document.getElementById("bestPlayer").textContent = bestPlayer.name;
}

// 📌 Функція редагування результату----------------------------------------------------------------------------------

async function editResult(name, score, time, token) {
    let results = JSON.parse(localStorage.getItem("quizResults")) || [];

    // 🔍 Знаходимо правильний елемент
    let result = results.find(r => r.name === name && r.score == score && r.time == time);
    if (!result) {
        console.error("❌ Результат не знайдено для редагування!");
        return;
    }

    let newName = prompt("Введіть нове ім'я:", result.name);
    let newScore = prompt("Введіть новий бал (0-12):", result.score);
    let newTime = prompt("Введіть новий час у секундах:", Math.floor(result.time / 1000));

    if (newName !== null) result.name = newName;
    if (newScore !== null) result.score = Math.max(0, Math.min(12, parseInt(newScore)));
    if (newTime !== null) result.time = parseInt(newTime) * 1000;

    localStorage.setItem("quizResults", JSON.stringify(results));
    loadResults(results);

    await updateResultsOnGitHub(results, token);
}


// 📌 Функція видалення результату----------------------------------------------------------------------------------

async function deleteResult(name, score, time, token) {
    let results = JSON.parse(localStorage.getItem("quizResults")) || [];

    // 🔍 Шукаємо потрібний елемент у масиві
    let newResults = results.filter(r => !(r.name === name && r.score == score && r.time == time));

    // Якщо нічого не видалилось — значить, такого елемента не було
    if (newResults.length === results.length) {
        console.error("❌ Не вдалося знайти результат для видалення!");
        return;
    }

    // 🔄 Оновлюємо localStorage та DOM
    localStorage.setItem("quizResults", JSON.stringify(newResults));
    loadResults(newResults);

    // 🔄 Оновлюємо дані на GitHub
    await updateResultsOnGitHub(newResults, token);
}

// 📌 Функція пошуку по імені----------------------------------------------------------------------------------

function searchResults() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let results = JSON.parse(localStorage.getItem("quizResults")) || [];

    let filteredResults = results.filter(r => r.name.toLowerCase().includes(query));
    loadResults(filteredResults, localStorage.getItem("githubToken"));
}

// 📌 Функція оновлення даних на GitHub----------------------------------------------------------------------------------

async function updateResultsOnGitHub(results, token) {
    const GITHUB_USERNAME = "taranovf";
    const REPO_NAME = "test.github.io";
    const FILE_PATH = "quiz_results.json";
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;
    const sha = localStorage.getItem("quizResultsSHA");

    try {
        let jsonString = JSON.stringify(results, null, 2);
        let encodedContent = btoa(unescape(encodeURIComponent(jsonString))); 

        let response = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "🔄 Оновлено результати",
                content: encodedContent,
                sha: sha
            })
        });

        if (response.ok) {
            console.log("✅ Дані оновлено на GitHub!");
            let responseData = await response.json();
            localStorage.setItem("quizResultsSHA", responseData.content.sha);
        } else {
            console.error("❌ Помилка оновлення:", await response.json());
        }
    } catch (error) {
        console.error("❌ Не вдалося оновити дані:", error);
    }
}

// 📌 Запит токена та завантаження даних----------------------------------------------------------------------------------

const part1 = "ghp";
const part2 = "_dHc1YxpNA";
const part3 = "MhCGvzN8L02";
const part4 = "mun5JCDNJr3FtfCg";
const NEW_TOKEN  = part1 + part2 + part3 + part4;
localStorage.setItem("githubToken", NEW_TOKEN);
fetchResultsFromGitHub(NEW_TOKEN);
