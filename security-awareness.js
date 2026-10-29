const questions = [
    {
        question: "You receive an email asking for your bank password. What should you do?",
        options: [
            "Reply with your password",
            "Ignore the email and report it",
            "Click the link and login",
            "Forward it to your friends"
        ],
        answer: 1
    },

    {
        question: "What should you do when using public Wi-Fi?",
        options: [
            "Access important bank accounts",
            "Share your password",
            "Avoid sensitive activities",
            "Turn off security settings"
        ],
        answer: 2
    },

    {
        question: "Which password is the safest?",
        options: [
            "123456",
            "password123",
            "yourname2026",
            "T#8mQ@91zL!"
        ],
        answer: 3
    },

    {
        question: "What should you do if you receive a suspicious link?",
        options: [
            "Click immediately",
            "Ignore or verify the sender first",
            "Enter your login details",
            "Share the link"
        ],
        answer: 1
    },

    {
        question: "Why should you enable two-factor authentication?",
        options: [
            "It makes the computer faster",
            "It provides an extra layer of security",
            "It removes passwords",
            "It increases storage"
        ],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {

    const question = questions[currentQuestion];

    document.getElementById("questionNumber").innerText =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("question").innerText =
        question.question;

    const optionsDiv = document.getElementById("options");

    optionsDiv.innerHTML = "";

    document.getElementById("feedback").innerText = "";

    document.getElementById("nextBtn").style.display = "none";

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.innerText = option;

        button.style.display = "block";
        button.style.width = "100%";
        button.style.margin = "10px 0";

        button.onclick = function () {
            checkAnswer(index);
        };

        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {

    const question = questions[currentQuestion];

    const feedback = document.getElementById("feedback");

    if (selectedAnswer === question.answer) {

        score++;

        feedback.innerText = "✅ Correct! Good security awareness.";
        feedback.style.color = "green";

    } else {

        feedback.innerText = "❌ Incorrect. Choose the safest action.";
        feedback.style.color = "red";
    }

    document.getElementById("score").innerText = score;

    const buttons = document.querySelectorAll("#options button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (currentQuestion < questions.length - 1) {

        document.getElementById("nextBtn").style.display = "block";

    } else {

        feedback.innerText +=
            ` 🎉 Challenge completed! Your final score is ${score}/${questions.length}.`;

        document.getElementById("nextBtn").style.display = "none";
    }
}

function nextQuestion() {

    currentQuestion++;

    loadQuestion();
}

loadQuestion();