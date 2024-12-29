document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      question: "What does she like more?",
      options: ["Winters", "Summers"],
      correct: "Winters",
    },
    {
      question: "What does she like more?",
      options: ["Cats", "Dogs"],
      correct: "Cats",
    },
    {
      question: "Who's her favorite idol?",
      options: ["RM", "Jimin", "Jungkook", "Suga"],
      correct: "Jimin",
    },
    {
      question: "What's her favorite chocolate?",
      options: ["Milky Bar", "Snickers", "Silk Oreo", "Dairy Milk"],
      correct: "Silk Oreo",
    },
    {
      question: "What's her favorite TV series?",
      options: ["Stranger Things", "Breaking Bad", "Game of Thrones", "Money Heist"],
      correct: "Stranger Things",
    },
    {
      question: "What's her favorite movie series?",
      options: ["Harry Potter", "The Lord of the Rings", "The Hunger Games", "50 Shades of Grey"],
      correct: "Harry Potter",
    },
    {
      question: "What's her favorite anime?",
      options: ["Jujutsu Kaisen", "Naruto", "One Piece", "Demon Slayer"],
      correct: "Demon Slayer",
    },
    {
      question: "How tall is she?",
      options: ["4'11", "5'5", "5'3", "5'7"],
      correct: "5'3",
    },
    {
      question: "What's her pet rabbit's name?",
      options: ["Kittu", "Kuttu", "Snowy", "None"],
      correct: "Kuttu",
    },
    {
      question: "What's her favorite festival?",
      options: ["Diwali", "Holi", "Christmas", "Navratri"],
      correct: "Navratri",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  const intro = document.getElementById("intro");
  const quiz = document.getElementById("quiz");
  const scoreSection = document.getElementById("score");
  const nameInput = document.getElementById("name");
  const startButton = document.getElementById("start");
  const questionText = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const nextButton = document.getElementById("next");
  const finalScoreText = document.getElementById("final-score");

  startButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (!name) {
      alert("Please enter your name!");
      return;
    }
    intro.style.display = "none";
    quiz.style.display = "block";
    loadQuestion();
  });

  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option");
      optionElement.textContent = option;

      optionElement.addEventListener("click", () => {
        document.querySelectorAll(".option").forEach((el) => el.classList.remove("selected"));
        optionElement.classList.add("selected");
        nextButton.style.display = "block";
      });

      optionsContainer.appendChild(optionElement);
    });

    nextButton.style.display = "none";
  }

  nextButton.addEventListener("click", () => {
    const selectedOption = document.querySelector(".option.selected");
    if (!selectedOption) {
      alert("Please select an answer!");
      return;
    }

    if (selectedOption.textContent === questions[currentQuestionIndex].correct) {
      score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  });

  function showScore() {
    quiz.style.display = "none";
    scoreSection.style.display = "block";
    finalScoreText.textContent = `You scored ${score} out of ${questions.length}`;
  }
});