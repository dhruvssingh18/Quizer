const questions = [
  {
    question: "Which method is most suitable for problems with sparse rewards?",
    answers: [
      { text: "Value Iteration", correct: false },
      { text: "SARSA", correct: false },
      { text: "Monte Carlo methods", correct: true },
      { text: "Q-Learning", correct: false }
    ]
  },

  {
    question: "What problem does Double DQN primarily address?",
    answers: [
      { text: "Slow convergence", correct: false },
      { text: "Overestimation of Q-values", correct: true },
      { text: "Lack of exploration", correct: false },
      { text: "Continuous action spaces", correct: false }
    ]
  },

  {
    question: "What is the key difference between Q-Learning and SARSA?",
    answers: [
      { text: "Q-Learning is model-based", correct: false },
      { text: "Q-Learning is off-policy; SARSA is on-policy", correct: true },
      { text: "SARSA uses eligibility traces", correct: false },
      { text: "Q-Learning cannot handle continuous states", correct: false }
    ]
  },

   {
    question: "What distinguishes Fitted Q-Iteration from standard Q-Learning?",
    answers: [
      { text: "It doesn't use a discount factory", correct: false },
      { text: "It's model-free", correct: false },
      { text: " It's always on-policy", correct: false },
      { text: "It uses function approximation", correct: true }
    ]
  },

  {
    question: "Which algorithm is model-based and incorporates optimism under uncertainty?",
    answers: [
      { text: "Q-Learning", correct: false },
      { text: "Deep Q-Network (DQN)", correct: false },
      { text: "SARSA", correct: false },
      { text: "R-Max", correct: true }
    ]
  },

  {
    question: "What distinguishes Fitted Q-Iteration from standard Q-Learning?",
    answers: [
      { text: "Q-Learning", correct: false },
      { text: "Deep Q-Network (DQN)", correct: false },
      { text: "SARSA", correct: false },
      { text: "R-Max", correct: true }
    ]
  },

  {
    question: "Which method is an off-policy algorithm that learns the optimal Q-function?",
    answers: [
      { text: "SARSA", correct: false },
      { text: "Deep Q-Network (DQN)", correct: false },
      { text: "Q-Learning", correct: true },
      { text: "Fitted Q-Iteration", correct: false }
    ]
  },

  {
    question: "What is the main idea behind Double DQN?",
    answers: [
      { text: "Using two separate networks to reduce overestimation bias", correct: true },
      { text: "Combining policy and value functions", correct: false },
      { text: "Prioritizing experience replay", correct: false },
      { text: "Using Monte Carlo returns", correct: false }
    ]
  },

  {
    question: "Which algorithm uses a neural network to approximate the Q-function in value-based methods?",
    answers: [
      { text: "SARSA", correct: false },
      { text: "Monte Carlo Value Iteration", correct: false },
      { text: "Deep Q-Network (DQN)", correct: false },
      { text: "R-Max", correct: false }
    ]
  },

  
];

// Quiz DOM elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("quiz-next-btn");

let currentQuestionIndex = 0;
let score = 0;

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Start or restart quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";

  // Shuffle questions at the start
  shuffleArray(questions);

  showQuestion();
}
function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}


// Show a question and its answers
function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;

  // Shuffle answers for this question
  const shuffledAnswers = shuffleArray([...currentQuestion.answers]);

  shuffledAnswers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", () => selectAnswer(button));
    answerButtons.appendChild(button);
  });

  updateProgressBar();
}

// Reset quiz UI for next question
function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

// Handle answer selection
function selectAnswer(button) {
  const correct = button.dataset.correct === "true";

  if (correct) {
    button.style.backgroundColor = "#2ecc71";
    score++;
  } else {
    button.style.backgroundColor = "#e74c3c";
  }

  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.style.backgroundColor = "#2ecc71";
    }
  });

  nextButton.style.display = "block";
}

// Show final score
function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}! 🎉`;
  nextButton.textContent = "Play Again";
  nextButton.style.display = "block";
  
   const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "100%";

}

// Next button handler
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }

   
}

// Quiz next button event listener
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();


// --- Slider functionality ---

const boxes = document.querySelectorAll(".box");
const prevBtn = document.getElementById("prev-slide");
const nextBtn = document.getElementById("next-slide");

let index = 0;

function showSlide(i) {
  boxes.forEach((box, idx) => {
    box.classList.toggle("active", idx === i);
  });
}

prevBtn.addEventListener("click", () => {
  index = (index - 1 + boxes.length) % boxes.length;
  showSlide(index);
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % boxes.length;
  showSlide(index);
});

showSlide(index);


  const chatBox = document.getElementById("chat-box");
    const input = document.getElementById("message");
    const sendBtn = document.getElementById("send");

    function addMessage(role, text) {
      const msg = document.createElement("div");
      msg.classList.add("message", role);
      msg.textContent = `${role}: ${text}`;
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendBtn.addEventListener("click", async () => {
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  // Show typing animation
  const typingIndicator = showTyping();

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    removeTyping(typingIndicator);

    if (data.reply) {
      addMessage("assistant", data.reply);
    } else {
      addMessage("assistant", "Error: No reply from server.");
    }
  } catch (err) {
    removeTyping(typingIndicator);
    addMessage("assistant", "Error: Could not connect to server.");
  }
});


function toggleDiv() {
  const chatter = document.getElementById("chatter");
  if (chatter) {
    chatter.classList.toggle("show");
  }
}

    function showTyping() {
  const typing = document.createElement("div");
  typing.classList.add("message", "assistant", "typing");
  typing.textContent = "Typing";
  chatBox.appendChild(typing);

  // Animate dots
  let dots = 0;
  const interval = setInterval(() => {
    dots = (dots + 1) % 4;
    typing.textContent = "Typing" + ".".repeat(dots);
  }, 500);

  return { typing, interval };
}

function removeTyping(typingObj) {
  clearInterval(typingObj.interval);
  typingObj.typing.remove();
}