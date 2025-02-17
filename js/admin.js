// admin.js

document.addEventListener("DOMContentLoaded", function() {
    loadResults();
});

function saveResult(score, time, name) {
    let results = JSON.parse(localStorage.getItem("quizResults")) || [];
    
    // Якщо результат вже був збережений, виходимо
    if (localStorage.getItem("resultSaved")) return;
    
    // Перевіряємо, чи існує такий же запис у localStorage
    let exists = results.some(result => 
        result.name === name && 
        result.score === score && 
        result.time === time
    );
    
    if (exists) return; // Якщо результат вже є, не додаємо його повторно
    
    results.push({ name, score, time, date: new Date().toLocaleString() });
    localStorage.setItem("quizResults", JSON.stringify(results));
    localStorage.setItem("resultSaved", "true"); // Позначаємо, що результат збережено
}

function loadResults() {
    let results = JSON.parse(localStorage.getItem("quizResults")) || [];
    let tableBody = document.getElementById("resultsTableBody");
    if (!tableBody) return;
    tableBody.innerHTML = "";
    
    results.forEach((result, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${result.name || 'Невідомий користувач'}</td>
            <td>${result.score} / 12</td>
            <td>${Math.floor(result.time / 60000)} хв ${Math.floor((result.time % 60000) / 1000)} сек</td>
            <td>${result.date}</td>
            <td>
                <button class="delete" onclick="deleteResult(${index})">Видалити</button>
                <button class="save" onclick="saveResultLocally(${index})">Зберегти</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteResult(index) {
    let results = JSON.parse(localStorage.getItem("quizResults")) || [];
    results.splice(index, 1);
    localStorage.setItem("quizResults", JSON.stringify(results));
    localStorage.removeItem("resultSaved"); // Дозволяємо нову відправку після видалення
    loadResults();
}

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