//Dom elements

const startScreen=document.getElementById('start-screen');
const quizScreen=document.getElementById('quiz-screen');
const resultScreen=document.getElementById('result-screen');
const startButton=document.getElementById("start-btn");
const questionText=document.getElementById('question-text');
const answerContainer=document.getElementById('answers-container');
const currentQuestionSpan=document.getElementById('current-question');
const totalQuestionsSpan=document.getElementById('total-question');
const scoreSpan=document.getElementById('score');
const finalScoreSpan=document.getElementById('final-score');
const maxScoreSpan=document.getElementById('max-score');
const restartButton=document.getElementById('restart-btn');
const resultMessage=document.getElementById('result-message');
const progressBar=document.getElementById('progress');
console.log(progressBar)


const quizQuestion = [
    {
        question: "What is the capital of France?",
        answer:[
            {Text: "Paris", isCorrect: true},
            {Text: "London", isCorrect: false},
            {Text: "berlin", isCorrect: false},
            {Text: "Madrid", isCorrect: false}
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answer:[
            {Text: "Earth", isCorrect: false},
            {Text: "Jupiter", isCorrect: true},
            {Text: "Saturn", isCorrect: false},
            {Text: "Mars", isCorrect: false}
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answer:[
            {Text: "H2O", isCorrect: true},
            {Text: "CO2", isCorrect: false},
            {Text: "O2", isCorrect: false},
            {Text: "NaCl", isCorrect: false}
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answer:[
            {Text: "Harper Lee", isCorrect: true},
            {Text: "Mark Twain", isCorrect: false},
            {Text: "Ernest Hemingway", isCorrect: false},
            {Text: "F. Scott Fitzgerald", isCorrect: false}
        ]
    }
]

// quiz state var

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestion.length;
maxScoreSpan.textContent = quizQuestion.length;


//event listeners

startButton.addEventListener('click',startQuiz)
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    //reset variables
    currentQuestionIndex = 0;
    scoreSpan.textContent = score;


    startScreen.classList.remove('active');
    quizScreen.classList.add('active'); 

    showQuestion()
}

function showQuestion() {
    //reset state
    answerDisabled = false;

    const currentQuestion = quizQuestion[currentQuestionIndex];

    currentQuestionSpan.textContent=currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestion.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent=currentQuestion.question

    // 
    answerContainer.innerHTML=""

    currentQuestion.answer.forEach(answer=>{
        const button = document.createElement("button")
        button.textContent=answer.Text
        button.classList.add("answers-btn")

        
        button.dataset.isCorrect=answer.isCorrect

        button.addEventListener('click',selectAnswer)

        answerContainer.appendChild(button)
    })
}

function selectAnswer(){
    if(answerDisabled) return

    answerDisabled=true

    const selectedButton=event.target
    const Correct=selectedButton.dataset.isCorrect==="true"

    Array.from(answerContainer.children).forEach((button) => {
        if(button.dataset.isCorrect==="true"){
            button.classList.add("correct")
        }else{
            button.classList.add("incorrect")
        }
    })

    if(Correct){
        score++
        scoreSpan .textContent=score
    }

    setTimeout(() => {
       currentQuestionIndex++
       
       // check if there are more question or if the quiz is over
        if(currentQuestionIndex < quizQuestion.length){
            showQuestion()
        }else{
            showResult()
        }
    },1000);

}

function showResult(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent=score
    
    const percentage=(score/quizQuestion.length)*100

    if(percentage===100){
        resultMessage.textContent="Pefect! You're a genius"
    }else if(percentage>=80){
         resultMessage.textContent="great job! You're a genius"
    }else if(percentage>=60){
         resultMessage.textContent="godd effort! You're a genius"
    } else if(percentage>=40){
         resultMessage.textContent="not bad! You're a genius"
    } else{
         resultMessage.textContent="bad! You're a genius"
    } 
}

function restartQuiz() {
    resultScreen.classList.remove("active")

    startQuiz()
}