document.addEventListener('DOMContentLoaded', function() {
    const quizData = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "Berlin", "Madrid", "Rome"],
            correct: 0
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            correct: 1
        },
        {
            question: "Who wrote 'Hamlet'?",
            options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"],
            correct: 2
        },
        // Add more questions here
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;

    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextBtn = document.getElementById('next-btn');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const restartBtn = document.getElementById('restart-btn');

    function loadQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = '';

        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(optionElement, index));
            optionsElement.appendChild(optionElement);
        });
        nextBtn.style.display = 'none';
    }

    function selectOption(optionElement, index) {
        const allOptions = document.querySelectorAll('.option');
        allOptions.forEach(opt => opt.classList.remove('selected'));
        optionElement.classList.add('selected');
        selectedOption = index;
        nextBtn.style.display = 'block';
    }

    function checkAnswer() {
        const currentQuestion = quizData[currentQuestionIndex];
        if (selectedOption === currentQuestion.correct) {
            score++;
        }
    }

    function showResult() {
        resultText.textContent = `Your Score: ${score} / ${quizData.length}`;
        resultContainer.style.display = 'block';
        document.getElementById('quiz-container').style.display = 'none';
    }

    function nextQuestion() {
        checkAnswer();
        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        loadQuestion();
    }

    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);

    loadQuestion();
});