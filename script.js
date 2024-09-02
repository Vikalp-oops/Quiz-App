const questions = [
  {
    question: "Who is the Greatest Indian Captain?",
    answers: [
      { text: "Virat Kohli", correct: false },
      { text: "MS Dhoni", correct: false },
      { text: "Rohit Sharma", correct: true },
      { text: "Sourav Ganguly", correct: false },
    ],
  },

  {
    question: "Which IPL Team has won most number of Titles?",
    answers: [
      { text: "Mumbai Indians", correct: true },
      { text: "Chennai Super Kings", correct: false },
      { text: "Kolkata Knight Riders", correct: false },
      { text: "Sunriser HAydrabad", correct: false },
    ],
  },
  {
    question: "Who is the Best Test Batsman among Active Players",
    answers: [
      { text: "Virat Kohli", correct: false },
      { text: "Joe Root", correct: false },
      { text: "Kane Williamson", correct: false },
      { text: "Steve Smith", correct: true },
    ],
  },
  {
    question: "Who is the Greatest Player of All-Time?",
    answers: [
      { text: "Leo Messi", correct: true },
      { text: "Cristiano Ronaldo", correct: false },
      { text: "Neymar JR.", correct: false },
      { text: "Pele", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
const showQuestion = function () {
  let currentQuestion = questions[currentQuestionIndex];
  let questionNum = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

  resetState();
  //   answerButtons.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    //clickinmg on buttons
    button.addEventListener("click", selectAnswer);
  });
};

const resetState = function () {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
};

const selectAnswer = function (e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
};

const showScore = function () {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
};

const handleNextButton = function () {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

//next button
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
