// Get URL params
const urlParams = new URLSearchParams(window.location.search);
const bookName = urlParams.get('book') || "Genesis";
const levelNumber = parseInt(urlParams.get('level')) || 1;

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let canAnswer = true;

const timerElement = document.getElementById('timer');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const scoreboardContainer = document.getElementById('scoreboard-container');
const scoreElement = document.getElementById('score');
const nextLevelBtn = document.getElementById('next-level-btn');
const feedbackOverlay = document.getElementById('feedback-overlay');

// Update UI with Level Info
// document.title = `${bookName} - Level ${levelNumber}`; // Optional

function initQuiz() {
    console.log("Initializing Quiz...");
    
    // Check if bibleData is defined
    if (typeof bibleData === 'undefined') {
        console.error("bibleData is undefined! Waiting...");
        // Fallback: Retry or show error
        questionText.innerText = "Error: Data not loaded. Please refresh.";
        return;
    }

    // Load questions from data.js
    if (bibleData[bookName] && bibleData[bookName].levels[levelNumber]) {
        questions = bibleData[bookName].levels[levelNumber];
    } else {
        console.warn(`Data missing for ${bookName} Level ${levelNumber}`);
        // Fallback or placeholder if data missing
        questions = [
            { question: "Question 1 (Placeholder)", options: ["A", "B", "C", "D"], correct: 0 },
            { question: "Question 2 (Placeholder)", options: ["A", "B", "C", "D"], correct: 0 },
            { question: "Question 3 (Placeholder)", options: ["A", "B", "C", "D"], correct: 0 },
            { question: "Question 4 (Placeholder)", options: ["A", "B", "C", "D"], correct: 0 },
            { question: "Question 5 (Placeholder)", options: ["A", "B", "C", "D"], correct: 0 }
        ];
    }
    
    startQuiz();
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// ... (rest of functions: showQuestion, resetState, startTimer, etc need to remain)
// I need to be careful with the replace tool. I'll include the whole file content to be safe and clean, 
// or use careful replacement chunks. Since I'm changing the top structure heavily, replace_file_content 
// with a large range might be best, OR write_to_file completely. 
// Given the file size is ~269 lines, write_to_file is safer to guarantee structure.



function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });

    startTimer();
}

function resetState() {
    canAnswer = true;
    clearInterval(timer);
    timeLeft = 30;
    timerElement.innerText = timeLeft;
    optionsContainer.innerHTML = '';
    nextBtn.style.display = 'none';
    feedbackOverlay.style.display = 'none';
    feedbackOverlay.innerHTML = '';
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeOut();
        }
    }, 1000);
}

function handleTimeOut() {
    canAnswer = false;
    showFeedback(false);
    setTimeout(() => {
        nextQuestion();
    }, 2000);
}

function selectAnswer(selectedIndex) {
    if (!canAnswer) return;
    canAnswer = false;
    clearInterval(timer);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correct;

    if (isCorrect) {
        score++;
        showFeedback(true);
    } else {
        showFeedback(false);
    }

    setTimeout(() => {
        nextQuestion();
    }, 2500);
}

function showFeedback(isCorrect) {
    feedbackOverlay.style.display = 'flex';
    if (isCorrect) {
        feedbackOverlay.innerHTML = '<div class="feedback-icon correct">✓</div>';
        createConfetti();
    } else {
        feedbackOverlay.innerHTML = '<div class="feedback-icon wrong">✗</div>';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScoreboard();
    }
}

function showScoreboard() {
    quizContainer.style.display = 'none';
    scoreboardContainer.style.display = 'flex';
    scoreElement.innerText = score;
    
    saveProgress();
}

function saveProgress() {
    const userProgress = JSON.parse(localStorage.getItem('bibleQuizProgress')) || {};
    if (!userProgress[bookName]) userProgress[bookName] = {};
    
    // Save level completion
    userProgress[bookName][levelNumber] = {
        completed: true,
        score: score,
        total: questions.length,
        timestamp: new Date().toISOString()
    };

    // Update global stats
    if (!userProgress.stats) userProgress.stats = { totalQuestions: 0, totalCorrect: 0, levelsCompleted: 0 };
    // Note: This simple logic adds to stats every time. Better logic would be to only add *new* questions answered or just recalc from level data.
    // For simplicity, let's just track "Last Score" in level data and maybe aggregate later.
    
    localStorage.setItem('bibleQuizProgress', JSON.stringify(userProgress));
}

const levelPageMap = {
    "Genesis": "Glevels.html",
    "Exodus": "Elevels.html",
    "Leviticus": "Llevels.html",
    "Numbers": "Nlevels.html",
    "Deuteronomy": "Dlevels.html",
    "Joshua": "Joshlevels.html",
    "Judges": "Judglevels.html",
    "Ruth": "Ruthlevels.html",
    "1 Samuel": "1Samlevels.html",
    "2 Samuel": "2Samlevels.html",
    "1 Kings": "1Kingslevels.html",
    "2 Kings": "2Kingslevels.html",
    "1 Chronicles": "1Chrlevels.html",
    "2 Chronicles": "2Chrlevels.html",
    "Ezra": "Ezralevels.html",
    "Nehemiah": "Nehlevels.html",
    "Tobit": "Tobitlevels.html",
    "Judith": "Judithlevels.html",
    "Esther": "Estherlevels.html",
    "1 Maccabees": "1Maccabeeslevels.html",
    "2 Maccabees": "2Maccabeeslevels.html",
    "Job": "Joblevels.html",
    "Psalms": "Psalmslevels.html",
    "Proverbs": "Proverbslevels.html",
    "Ecclesiastes": "Ecclesiasteslevels.html",
    "Song of Solomon": "SongofSolomonlevels.html",
    "Wisdom": "Wisdomlevels.html",
    "Sirach": "Sirachlevels.html",
    "Isaiah": "Isaiahlevels.html",
    "Jeremiah": "Jeremiahlevels.html",
    "Lamentations": "Lamentationslevels.html",
    "Baruch": "Baruchlevels.html",
    "Ezekiel": "Ezekiellevels.html",
    "Daniel": "Daniellevels.html",
    "Hosea": "Hosealevels.html",
    "Joel": "Joellevels.html",
    "Amos": "Amoslevels.html",
    "Obadiah": "Obadiahlevels.html",
    "Jonah": "Jonahlevels.html",
    "Micah": "Micahlevels.html",
    "Nahum": "Nahumlevels.html",
    "Habakkuk": "Habakkuklevels.html",
    "Zephaniah": "Zephaniahlevels.html",
    "Haggai": "Haggailevels.html",
    "Zechariah": "Zechariahlevels.html",
    "Malachi": "Malachilevels.html",
    "Matthew": "Matthewlevels.html",
    "Mark": "Marklevels.html",
    "Luke": "Lukelevels.html",
    "John": "Johnlevels.html",
    "Acts": "Actslevels.html",
    "Romans": "Romanslevels.html",
    "1 Corinthians": "1Corinthianslevels.html",
    "2 Corinthians": "2Corinthianslevels.html",
    "Galatians": "Galatianslevels.html",
    "Ephesians": "Ephesianslevels.html",
    "Philippians": "Philippianslevels.html",
    "Colossians": "Colossianslevels.html",
    "1 Thessalonians": "1Thessalonianslevels.html",
    "2 Thessalonians": "2Thessalonianslevels.html",
    "1 Timothy": "1Timothylevels.html",
    "2 Timothy": "2Timothylevels.html",
    "Titus": "Tituslevels.html",
    "Philemon": "Philemonlevels.html",
    "Hebrews": "Hebrewslevels.html",
    "James": "Jameslevels.html",
    "1 Peter": "1Peterlevels.html",
    "2 Peter": "2Peterlevels.html",
    "1 John": "1Johnlevels.html",
    "2 John": "2Johnlevels.html",
    "3 John": "3Johnlevels.html",
    "Jude": "Judelevels.html",
    "Revelation": "Revelationlevels.html"
};

nextLevelBtn.addEventListener('click', () => {
    const nextLevel = levelNumber + 1;
    if (nextLevel <= bibleData[bookName].chapters) {
        window.location.href = `quiz.html?book=${bookName}&level=${nextLevel}`;
    } else {
        alert("Congratulations! You have completed this book!");
        window.location.href = levelPageMap[bookName] || "OT.html";
    }
});

document.getElementById('go-home-btn').addEventListener('click', () => {
    window.location.href = levelPageMap[bookName] || "OT.html";
});

// Simple Confetti Implementation
function createConfetti() {
    const colors = ['#ffc107', '#ff0000', '#00ff00', '#0000ff', '#ff00ff'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Start the quiz on load
// Start the quiz on load
window.onload = initQuiz;
