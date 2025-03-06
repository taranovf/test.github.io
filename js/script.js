const quizData = [
    { question: "У якому році засновано Миколаїв?", answers: ["1789", "1790", "1788", "1800"], correct: 0 },
    { question: "Яка річка протікає через Миколаїв?", answers: ["Дніпро", "Інгул", "Західний Буг", "Десна"], correct: 1 },
    { question: "Як називається головний театр міста?", answers: ["Театр Франка", "Миколаївський драмтеатр", "Театр Шевченка", "Оперний театр"], correct: 1 },
    { question: "Як називається головна площа Миколаєва?", answers: ["Соборна", "Перемоги", "Центральна", "Гвардійська"], correct: 0 },
    { question: "Який великий суднобудівний завод знаходиться у Миколаєві?", answers: ["Чорноморський", "Миколаївський", "Зоря-Машпроект", "Богдан"], correct: 0 },
    { question: "Який парк є найбільшим у місті?", answers: ["Перемоги", "Каштановий", "Серце міста", "Сухий фонтан"], correct: 0 },
    { question: "Який популярний ринок працює у Миколаєві?", answers: ["Критий", "Центральний", "Книжковий", "Садовий"], correct: 1 },
    { question: "Як називається найбільший торговий центр міста?", answers: ["City Center", "Мій дім", "Південний Буг", "Фабрика"], correct: 0 },
    { question: "Який символ є на гербі Миколаєва?", answers: ["Лев", "Якір", "Корабель", "Зірка"], correct: 2 },
    { question: "Який район не входить до складу Миколаєва?", answers: ["Центральний", "Інгульський", "Корабельний", "Приморський"], correct: 3 },
    { question: "Коли Миколаїв став адміністративним центром області?", answers: ["1937", "1944", "1951", "1960"], correct: 0 },
    { question: "Який відомий корабель був спущений на воду в Миколаєві і був потоплений у 2022 році?", answers: ["Адмірал Кузнєцов", "Крейсер Москва", "Варяг", "Миколаїв"], correct: 1 }
];
const backgroundImages = [
    "url('https://m.kontrakty.ua/images/stories/nikolaev24.com.ua.jpg')",
    "url('https://images.unian.net/photos/2017_08/thumb_files/1000_545_1502838405-5684.jpg?1')",
    "url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Mykolaiv._Russian_Drama_Theatre.jpg/1200px-Mykolaiv._Russian_Drama_Theatre.jpg')",
    "url('https://cdn4.suspilne.media/images/resize/900x1.78/4bccc24fc475e1db.jpg')",
    "url('https://kanaldom.tv/wp-content/uploads/2021/10/01_chernomorsk-820x473.jpg')",
    "url('https://upload.wikimedia.org/wikipedia/commons/1/19/%D0%9F%D0%B0%D1%80%D0%BA_%D0%9F%D0%B5%D1%80%D0%B5%D0%BC%D0%BE%D0%B3%D0%B8%2C_%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D1%97%D0%B2._%D0%91%D0%B5%D1%80%D0%B5%D0%B3_%D0%86%D0%BD%D0%B3%D1%83%D0%BB%D1%83.JPG')",
    "url('https://lh4.googleusercontent.com/proxy/zpjEvI9B_ClfZASYBG59tJCYkm34_kMjTh36D77-lNhbGcWhS5IRgDdMXh0FaZKgvXr3H94oUPeaioFGeuj8MjFAOTfRuo5J_-a1B9iAxnACLD_w-PrtmzcT')",
    "url('https://malls.rent/app/uploads/public/651/159/589/651159589f424624581014.jpeg')",
    "url('https://cdn4.suspilne.media/images/e96370d88cd0fd30.png')",
    "url('https://thegard.city/upload/article/o_1edee6od23idqd4sh11ci1um62s.jpg')",
    "url('https://www.mykolayiv.org/media/cache/c4/f9/c4f90cca7e12e17ff23bbcda4480e603.jpg')",
    "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7XGJ2zJ03iarsIvGssXFw-yw605EOeuQcyQ&s')"
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

    document.body.style.backgroundImage = backgroundImages[currentQuestion];
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