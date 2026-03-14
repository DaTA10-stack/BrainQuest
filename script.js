import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabaseUrl = "https://indsorfjcozlnpgijamo.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluZHNvcmZqY296bG5wZ2lqYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTk1MjAsImV4cCI6MjA4OTA3NTUyMH0.upc8ooD0ndrWnQV0qnCyO04hMgBqTAepYAud_52OoBU"

const supabase = createClient(supabaseUrl, supabaseKey)

import { saveScore } from "./scores.js"

let score = 0;

let questions = [
{
    text: "What is 1+1",
    answers: ["Two","2","II","1+1-1+2+2-1-2"],
    correct: 0,
    wrong: [1,2,3]
},

{
    text: "What is 5!",
    answers: ["120","5","25","240"],
    correct: 0,
    wrong: [1,2,3]
},

{
    text: "Which language runs in the browser?",
    answers: ["Python","JavaScript","C++","Java"],
    correct: 1,
    wrong: [0,2,3]
}
];

let currentQuestion = 0;

let playerName = "";

let playerNameInput = document.getElementById("playerName");

let startButton = document.getElementById("startButton");

let gameArea = document.getElementById("gameArea");

let questionElement = document.getElementById("question");

let scoreElement = document.getElementById("score");

let answerButtons = document.querySelectorAll(".answerBtn");

let timerElement = document.getElementById("timer");

startButton.addEventListener("click", startGame);


function shuffleQuestions(){

for(let i = questions.length - 1; i > 0; i--){

let randomIndex = Math.floor(Math.random() * (i + 1));

let temp = questions[i];

questions[i] = questions[randomIndex];

questions[randomIndex] = temp;

}

}


function startGame(){

    playerName = playerNameInput.value;

    shuffleQuestions();

    startButton.style.display = "none";

    gameArea.style.display = "block";

    loadQuestion();

}

function loadQuestion(){

    clearInterval(timer);

    let q = questions[currentQuestion];

    questionElement.textContent = q.text;

    for(let i=0;i<answerButtons.length;i++){

    answerButtons[i].textContent = q.answers[i];

    answerButtons[i].onclick = function(){
    checkAnswer(i);
    };

    }

    startTimer();

}

function startTimer(){

    timeLeft = 10;

    timerElement.textContent = timeLeft;

    timer = setInterval(function(){

    timeLeft--;

    timerElement.textContent = timeLeft;

    if(timeLeft <= 0){

    clearInterval(timer);

    checkAnswer(-1);
}

},1000);

}

function checkAnswer(answerIndex){

    clearInterval(timer);

    let q = questions[currentQuestion];

    if(answerIndex === q.correct){

        score = score + 10;

        scoreElement.textContent = score;

    }
    else if(timeLeft === 0){

        score = score - 10;

        scoreElement.textContent = score;
    }
    else{

        score = score - 5;

        scoreElement.textContent = score;

    }

    currentQuestion++;

    if(currentQuestion < questions.length){

        loadQuestion();

    }
    else{

        submitScore();
        saveScore(score)

    }
}

async function submitScore() {

const { data, error } = await supabase
.from("leaderboard")
.insert([
{
name: playerName,
score: score
}
])

localStorage.setItem("finalScore", score)

window.location.href = "results.html"

}
