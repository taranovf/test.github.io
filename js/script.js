const quizData = [
    { question: "У якому році засновано Миколаїв?", answers: ["1789", "1790", "1788", "1800"], correct: 0 },
    { question: "Яка річка протікає через Миколаїв?", answers: ["Дніпро", "Інгул", "Буг", "Десна"], correct: 1 },
    { question: "Як називається головний театр міста?", answers: ["Театр Франка", "Миколаївський драмтеатр", "Театр Шевченка", "Оперний театр"], correct: 1 },
    { question: "Як називається головна площа Миколаєва?", answers: ["Соборна", "Перемоги", "Центральна", "Гвардійська"], correct: 0 },
    { question: "Який великий суднобудівний завод знаходиться у Миколаєві?", answers: ["Чорноморський", "Миколаївський", "Зоря-Машпроект", "Богдан"], correct: 0 },
    { question: "Який парк є найбільшим у місті?", answers: ["Перемоги", "Каштановий", "Серце міста", "Сухий фонтан"], correct: 0 },
    { question: "Який популярний ринок працює у Миколаєві?", answers: ["Критий", "Центральний", "Книжковий", "Садовий"], correct: 1 },
    { question: "Як називається найбільший торговий центр міста?", answers: ["City Center", "Мой дом", "Південний Буг", "Фабрика"], correct: 0 },
    { question: "Який символ є на гербі Миколаєва?", answers: ["Лев", "Якір", "Корабель", "Зірка"], correct: 2 },
    { question: "Який район не входить до складу Миколаєва?", answers: ["Центральний", "Інгульський", "Корабельний", "Приморський"], correct: 3 },
    { question: "Коли Миколаїв став адміністративним центром області?", answers: ["1937", "1944", "1951", "1960"], correct: 0 },
    { question: "Який відомий корабель був спущений на воду в Миколаєві?", answers: ["Адмірал Кузнєцов", "Слава", "Варяг", "Миколаїв"], correct: 3 }
];
let currentQuestion = 0;
let score = 0;
let startTime = Date.now();
let timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {
    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    let remaining = Math.max(360 - elapsed, 0);
    let minutes = Math.floor(remaining / 60);
    let seconds = remaining % 60;
    document.getElementById("timer").textContent = `Час: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (remaining === 0) {
        clearInterval(timerInterval);
        finishQuiz();
    }
}

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        finishQuiz();
        return;
    }
    let q = quizData[currentQuestion];
    document.getElementById("quiz").innerHTML = `
        <p class="question">${q.question}</p>
        ${q.answers.map((ans, index) => `<button class="answer" onclick="checkAnswer(${index}, this)">${ans}</button>`).join('')}
    `;
}

function checkAnswer(index, element) {
    let correctIndex = quizData[currentQuestion]?.correct;
    if (correctIndex === undefined) return;
    
    if (index === correctIndex) {
        element.classList.add("correct");
        score++;
    } else {
        element.classList.add("incorrect");
    }
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 500);
}

function finishQuiz() {
    localStorage.setItem("score", score);
    localStorage.setItem("time", Date.now() - startTime);
    window.location.href = 'stats.html';
}

loadQuestion();