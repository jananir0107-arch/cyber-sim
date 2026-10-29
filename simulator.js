let score = 0;

function checkAnswer(answer) {

    const result = document.getElementById("result");
    const scoreDisplay = document.getElementById("score");

    // Current message is a phishing message
    const correctAnswer = "phishing";

    if (answer === correctAnswer) {

        score++;

        result.innerHTML =
            "✅ Correct! This is a phishing message.";

        result.style.color = "green";

    } else {

        result.innerHTML =
            "❌ Wrong! This is a phishing message.";

        result.style.color = "red";
    }

    // Display updated score
    scoreDisplay.innerText = score;
}
