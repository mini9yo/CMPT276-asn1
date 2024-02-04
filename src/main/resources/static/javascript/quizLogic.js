// quizLogic.js
// Author: Kaylee Ryu
// Last Modified: Feb 3, 2024

// DOM Elements.
const questionsSection = document.getElementById('questions-section');
const navigationSection = document.getElementById('navigation-section');
const resultsSection = document.getElementById('results-section');
const scoreElement = document.getElementById('score');
const correctAnswersElement = document.getElementById('correct-answers');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');
const restartButton = document.getElementById('restart-button');

// Quiz Data
const quizQuestions = [
    {
        question: "1. What is Taylor Swift's middle name?",
        options: ["Alison", "Marie", "Elizabeth", "June"],
        correctAnswer: "Alison"
    },
    {
        question: "2. What is Taylor Swift's favourite number?",
        options: ["89", "22", "13", "15"],
        correctAnswer: "13"
    },
    {
        question: "3. Which album was the first for Taylor Swift to re-record after her masters were sold?",
        options: ["Speak Now", "Fearless", "Red", "1989"],
        correctAnswer: "Fearless"
    },
    {
        question: "4. Which music genre is Taylor Swift primarily associated with in the early years of her career?",
        options: ["Pop", "Alternative", "Country", "R&B"],
        correctAnswer: "Country"
    },
    {
        question: "5. Which one of these are not a name of Taylor Swift's cats?",
        options: ["Olivia", "Meredith", "Benjamin", "Dorothea"],
        correctAnswer: "Dorothea"
    }
];

// Variables
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// Event Listeners
prevButton.addEventListener('click', navigateToPreviousQuestion);
nextButton.addEventListener('click', navigateToNextQuestion);
submitButton.addEventListener('click', submitQuiz);
restartButton.addEventListener('click', restartQuiz);

// Initialization
initializeQuiz();

// Functions
// Initialize the quiz
function initializeQuiz() {
    displayQuestion(currentQuestionIndex);
}

// Display the question
function displayQuestion(index) {
    const ques = quizQuestions[index];
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById(`options`);

    questionElement.textContent = ques.question;
    optionsElement.innerHTML = '';

    ques.options.forEach((op) => {
        const optionElement = document.createElement('button');
        optionElement.textContent = op;
        
        optionElement.classList.add('option');
        optionElement.addEventListener('click', () => selectAnswer(op));

        optionsElement.appendChild(optionElement);
        optionsElement.appendChild(document.createElement('br'));
    });    

    if(userAnswers[index]){
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            if (option.textContent === userAnswers[index]) {
                option.classList.add('selected');
            }
        });
    }
    
    updateNavigationButtons();
}

// Navigation Functions
function navigateToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
    // else: button disabled: updateNavigationButtons()
}

function navigateToNextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }
    // else: button disabled: updateNavigationButtons()
}

// Select Answer
function selectAnswer(answer) {
    userAnswers[currentQuestionIndex] = answer;

    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected');
        if (option.textContent === answer) {
            option.classList.add('selected');
        }
    });

    updateNavigationButtons();
}


// Disable and Enable Navigation Buttons
function updateNavigationButtons() {
    prevButton.disabled = currentQuestionIndex === 0 || !userAnswers[currentQuestionIndex];
    nextButton.disabled = currentQuestionIndex === quizQuestions.length - 1 || !userAnswers[currentQuestionIndex];
    submitButton.disabled = userAnswers.length !== quizQuestions.length;
}

// Submit Quiz
function submitQuiz() {
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correctAnswer) {
            score++;
        }
    });

    scoreElement.textContent = `${score}/${quizQuestions.length}`; 

    correctAnswersElement.innerHTML = '';

    quizQuestions.forEach((ques, i) => {
        const ans = ques.correctAnswer;
        correctAnswersElement.innerHTML += `<br>${i+1}. ${ans}`;
    });
    questionsSection.style.display = 'none';
    navigationSection.style.display = 'none';
    resultsSection.style.display = 'block';
    submitButton.disabled = true;
}

// Restart Quiz
function restartQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    initializeQuiz();
    questionsSection.style.display = 'block';
    navigationSection.style.display = 'block';
    resultsSection.style.display = 'none';
}