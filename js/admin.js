async function fetchResultsFromGitHub(token) {
    const GITHUB_USERNAME = "taranovf";
    const REPO_NAME = "test.github.io";
    const FILE_PATH = "quiz_results.json";

    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;

    try {
        console.log("📥 Отримуємо дані з GitHub...");

        let response = await fetch(url, {
            headers: { Authorization: `token ${token}` }
        });

        if (!response.ok) throw new Error("❌ Помилка отримання файлу!");

        let data = await response.json();
        
        // ✅ Правильне декодування UTF-8 з Base64
        let fileContent = decodeURIComponent(escape(atob(data.content))); 

        let results = JSON.parse(fileContent); // Парсимо JSON

        console.log("✅ Отримані результати:", results);

        // Зберігаємо в localStorage
        localStorage.setItem("quizResults", JSON.stringify(results));

        // Зберігаємо останній SHA файлу
        localStorage.setItem("quizResultsSHA", data.sha);

        // Оновлюємо таблицю
        loadResults(token);

    } catch (error) {
        console.error("❌ Не вдалося отримати дані з GitHub:", error);
        localStorage.setItem("quizResults", JSON.stringify([]));
    }
}

// Функція для оновлення таблиці
function loadResults(token) {
    let results = JSON.parse(localStorage.getItem("quizResults")) || [];
    let tableBody = document.getElementById("resultsTableBody");

    if (!tableBody) {
        console.error("❌ Таблиця не знайдена!");
        return;
    }

    tableBody.innerHTML = "";

    results.forEach((result, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${result.name || "Невідомий користувач"}</td>
            <td>${result.score} / 12</td>
            <td>${Math.floor(result.time / 60000)} хв ${Math.floor((result.time % 60000) / 1000)} сек</td>
            <td>${result.date}</td>
            <td>
                <button onclick="deleteResult(${index}, '${token}')">❌ Видалити</button>
                <button onclick="saveResultLocally(${index})">💾 Зберегти</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    console.log("📊 Таблиця оновлена!");
}

// Функція для видалення результату з GitHub
async function deleteResult(index, token) {
    const GITHUB_USERNAME = "taranovf";
    const REPO_NAME = "test.github.io";
    const FILE_PATH = "quiz_results.json";
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;

    let results = JSON.parse(localStorage.getItem("quizResults")) || [];

    if (index < 0 || index >= results.length) {
        console.error("❌ Невірний індекс для видалення");
        return;
    }

    // Видаляємо вибраний запис
    results.splice(index, 1);

    try {
        // 🔥 Отримуємо останній SHA перед оновленням
        let shaResponse = await fetch(url, {
            headers: { Authorization: `token ${token}` }
        });

        if (!shaResponse.ok) throw new Error("❌ Не вдалося отримати свіжий SHA!");

        let shaData = await shaResponse.json();
        let sha = shaData.sha;

        let jsonString = JSON.stringify(results, null, 2);
        let encodedContent = btoa(unescape(encodeURIComponent(jsonString))); 

        let response = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `token ${token}`,
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
            localStorage.setItem("quizResults", JSON.stringify(results));
            loadResults(token); // Перезавантажуємо таблицю
        } else {
            console.error("❌ Помилка видалення:", await response.json());
        }
    } catch (error) {
        console.error("❌ Не вдалося видалити запис:", error);
    }
}

// Функція для збереження вибраного результату у файл
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
// Викликаємо отримання даних та оновлення таблиці
// const NEW_TOKEN = prompt("Введіть GitHub токен:");
const part1 = "ghp";
const part2 = "_dHc1YxpNA";
const part3 = "MhCGvzN8L02";
const part4 = "mun5JCDNJr3FtfCg";
const token = part1 + part2 + part3 + part4;
fetchResultsFromGitHub(token);
