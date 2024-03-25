// Get the necessary elements from the HTML
const startbutton = document.querySelector('.start-button');
const popupInfo=document.querySelector('.popup-info');
const exitBtn=document.querySelector('.exit-btn');
const main =document.querySelector('.main');
const continueBtn =document.querySelector('.continue-btn');
const quizSection =document.querySelector('.quiz-section');
const quizBox =document.querySelector('.quiz-box');
const resultBox =document.querySelector('.result-box');
const tryAgainBtn =document.querySelector('.tryagain-btn');
const goHomeBtn =document.querySelector('.gohome-btn');

// When the "Start Quiz" button is clicked
startbutton.onclick= () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

// When the "Exit Quiz" button in the popup is clicked
exitBtn.onclick= () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

let timeLimit = 60; // Total time limit for the quiz in seconds
let timeLeft = timeLimit;
let timerInterval;


// Function to handle the countdown timer
function countdownTimer() {
    timeLeft--;
    updateTimer();
  
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeUp();
    }
  }
// Function to update the timer display
  function updateTimer() {
    const timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = timeLeft;
  }

  // When the "Continue" button in the popup is clicked
continueBtn.onclick= () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

timeLeft = timeLimit; // Reset the time left to the total time limit
updateTimer();
timerInterval = setInterval(countdownTimer, 1000); // Start the timer interval

    showquestion(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNum = 1;
    userScore = 0;
    showquestion(questionCount);
    questionCounter(questionNum);

    headerScore();

    timeLeft = timeLimit;
    updateTimer();
    timerInterval = setInterval(countdownTimer, 1000);

}

// When the "Go To Home" button in the result box is clicked
goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNum = 1;
    userScore = 0;
    showquestion(questionCount);
    questionCounter(questionNum);


}
let questionCount = 0;
let questionNum = 1;
let userScore = 0;


const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick= () => {
    if(questionCount <questions.length-1){
        questionCount++;
        showquestion(questionCount);

        questionNum++;
        questionCounter(questionNum);

        nextBtn.classList.remove('active');
    }
    else{
        showResultBox();
    }
}
// Function to show the current question and options
const optionList = document.querySelector('.option-list') 

//getting questions and options from arry

function showquestion(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].Option[0]}</span></div>
    <div class="option"><span>${questions[index].Option[1]}</span></div>
    <div class="option"><span>${questions[index].Option[2]}</span></div>
    <div class="option"><span>${questions[index].Option[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let i=0;i<option.length;i++){
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}
// Function to handle user option selection
function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;
  
    if(userAnswer == correctAnswer){
        answer.classList.add('correct');
        userScore +=1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');

        //if answer incorrect,auto selected correct answer
        for(let i=0;i<allOptions;i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }
    //if user has selected, disabled all options
    for(let i=0;i<allOptions;i++){
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}

function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}
function handleTimeUp() {
    clearInterval(timerInterval); // Stop the timer when the time is up
  
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
  
    // Your code to calculate and display the score
    // Since the time is up, you can calculate the score based on the answers submitted so far.
    // Display the result to the user.
  }
  

function showResultBox(){

    clearInterval(timerInterval); // Stop the timer when showing the result sheet

    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background =`conic-gradient(#097f9f ${progressStartValue * 3.6}deg, rgba(255,255,255,0.1)0deg)`;


        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    }, speed);

    handleTimeUp(); // Call the function to handle the time's up scenario
}