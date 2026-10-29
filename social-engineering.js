const scenarios = [
    {
        question: "You receive an email asking you to verify your bank account through a link. What type of attack is this?",
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
        question: "An attacker pretends to be an IT employee and asks for your password using a fake story. What type of attack is this?",
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

    if (selectedAnswer === scenarios[currentScenario].answer) {

        score++;

        result.innerText = "✅ Correct!";
        result.style.color = "green";

    } else {

        result.innerText = "❌ Incorrect!";
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
            "Final Score: " + score + "/" + scenarios.length;

        document.getElementById("result").style.color = "green";
    }
}

loadScenario();