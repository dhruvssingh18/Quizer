const questions = [
  {
    question: "In reinforcement learning, the Actor is responsible for:",
    answers: [
      { text: "Estimating the value function", correct: false },
      { text: "Selecting actions based on the policy ", correct: true },
      { text: "Generating rewards", correct: false },
      { text: "Modeling the environment dynamics", correct: false }
    ]
  },
  {
    question: "Which method combines policy gradients with a learned value function?",
    answers: [
      { text: "Q-Learning", correct: false },
      { text: "Vanilla Policy Gradient", correct: true },
      { text: "Actor-Critic", correct: false },
      { text: "R-Max", correct: false }
    ]
  },

  {
    question: "The Actor updates its behavior by:",
    answers: [
      { text: "Adjusting the policy parameters based on feedback from the Critic", correct: true },
      { text: "Increasing the discount factor", correct: false },
      { text: "Changing the reward function", correct: false },
      { text: "Memorizing all past actions", correct: false }
    ]
  },

  {
    question: "What is a key feature of Soft Actor-Critic (SAC)?",
    answers: [
      { text: "It only works in discrete environments", correct: false },
      { text: "It does not use a critic", correct: false },
      { text: "It is a model-based method", correct: false },
      { text: "It maximizes entropy for better exploration", correct: true }
    ]
  },

  {
    question: "Which algorithm uses Kronecker-factored approximation for natural gradients?",
    answers: [
      { text: "Twin Delayed DDPG (TD3)", correct: false },
      { text: "Deep Q-Network (DQN)", correct: false },
      { text: "Actor-Critic using Kronecker-Factored Trust Region", correct: true },
      { text: "SARSA", correct: false }
    ]
  },

  {
    question: "What does Asynchronous Advantage Actor-Critic (A3C) introduce?",
    answers: [
      { text: "A deterministic policy only", correct: false },
      { text: "Parallel agents learning asynchronously to improve efficiency", correct: true },
      { text: "Elimination of the critic network", correct: false },
      { text: "Pure Monte Carlo updates", correct: false }
    ]
  },

  {
    question: "Which Actor-Critic variant is designed for continuous action spaces?",
    answers: [
      { text: "A3C", correct: false },
      { text: "Deep Deterministic Policy Gradient (DDPG)", correct: true },
      { text: "Vanilla Policy Gradient", correct: false },
      { text: "Q-Learning", correct: false }
    ]
  },

  {
    question: "How does DDPG handle exploration?",
    answers: [
      { text: "Using ε-greedy action selection", correct: false },
      { text: "Increasing the discount factor", correct: false },
      { text: " Removing the critic during exploration", correct: false },
      { text: "Adding noise to the actor’s output", correct: true }
    ]
  }

  
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