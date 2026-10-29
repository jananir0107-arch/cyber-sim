
const scenarios = [
    {
        question: "You receive an email asking you to click a link and verify your bank account. What type of attack is this?",
        answer: "phishing"
    },

    {
        question: "Someone calls you pretending to be a bank employee and asks for your OTP. What type of attack is this?",
        answer: "vishing"
    },

    {
        question: "You receive an SMS saying you won a prize and asking you to click a link. What type of attack is this?",
        answer: "smishing"
    },

    {
        question: "An attacker pretends to be an IT employee and creates a fake story to obtain your password. What type of attack is this?",
        answer: "pretexting"
    }
];

let currentScenario = 0;
let score = 0;

function loadScenario() {

    document.getElementById("scenario").innerText =
        scenarios[currentScenario].question;

    document.getElementById("result").innerText = "";
}

function checkAnswer(selectedAnswer) {

    const result = document.getElementById("result");
    const correctAnswer = scenarios[currentScenario].answer;

    if (selectedAnswer === correctAnswer) {

        score++;

        result.innerText =
            "✅ Correct! You identified the social engineering technique.";

        result.style.color = "green";

    } else {

        result.innerText =
            "❌ Incorrect! Try to identify the attack carefully.";

        result.style.color = "red";
    }
}

function nextScenario() {

    if (currentScenario < scenarios.length - 1) {

        currentScenario++;
        loadScenario();

    } else {

        document.getElementById("scenario").innerText =
            "🎉 Challenge Completed!";

        document.getElementById("result").innerText =
            "Your Score: " + score + "/" + scenarios.length;

        document.getElementById("result").style.color = "green";
    }
}

loadScenario();