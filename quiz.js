const missions = [

    {
        question:
            "📧 You receive an email saying your bank account will be blocked unless you click a link and enter your password. What should you do?",

        options: [
            "Click the link immediately",
            "Reply with your password",
            "Report the email and verify through the official bank website",
            "Forward the email to friends"
        ],

        answer: 2,
        risk: "HIGH"
    },


    {
        question:
            "🦠 Your computer suddenly becomes very slow and unknown programs start running. What is the safest first action?",

        options: [
            "Ignore the problem",
            "Disconnect the computer from the network",
            "Install random software",
            "Share the computer with another user"
        ],

        answer: 1,
        risk: "HIGH"
    },


    {
        question:
            "🔐 You receive an OTP that you did not request. Someone then calls asking you to tell them the OTP. What should you do?",

        options: [
            "Give them the OTP",
            "Share only the last two digits",
            "Do not share it and report the suspicious request",
            "Send the OTP through email"
        ],

        answer: 2,
        risk: "CRITICAL"
    },


    {
        question:
            "🌐 You are using public Wi-Fi at an airport. Which action is safest?",

        options: [
            "Access sensitive banking information without protection",
            "Share your password with friends",
            "Avoid sensitive activities and use a trusted secure connection",
            "Disable all security settings"
        ],

        answer: 2,
        risk: "MEDIUM"
    },


    {
        question:
            "📁 A ransomware warning appears and files start becoming inaccessible. What should you do?",

        options: [
            "Continue opening files",
            "Disconnect the affected system from the network",
            "Share the infected files",
            "Disable antivirus protection"
        ],

        answer: 1,
        risk: "CRITICAL"
    },


    {
        question:
            "💻 You notice several failed login attempts on your account. What is a sensible security action?",

        options: [
            "Ignore the alerts",
            "Use the same password everywhere",
            "Change the password and enable multi-factor authentication",
            "Share the login details with a friend"
        ],

        answer: 2,
        risk: "HIGH"
    },


    {
        question:
            "💬 You receive an SMS saying you won a prize and asking you to open a link. What should you do?",

        options: [
            "Open the link",
            "Enter your bank details",
            "Ignore the message and verify the sender independently",
            "Forward the message"
        ],

        answer: 2,
        risk: "MEDIUM"
    },


    {
        question:
            "🔑 Which password provides stronger protection?",

        options: [
            "12345678",
            "password123",
            "janani2005",
            "T9#kL!72@Qz"
        ],

        answer: 3,
        risk: "MEDIUM"
    }

];


let currentQuestion = 0;

let score = 0;

let lives = 3;

let answered = false;


// Shuffle questions every new mission

function shuffleQuestions() {

    missions.sort(function () {

        return Math.random() - 0.5;

    });

}


// Load question

function loadQuestion() {

    answered = false;

    const mission =
        missions[currentQuestion];


    document.getElementById("questionNumber").innerText =
        (currentQuestion + 1) + " / " + missions.length;


    document.getElementById("question").innerText =
        mission.question;


    document.getElementById("riskLevel").innerText =
        "⚠️ Threat Level: " + mission.risk;


    document.getElementById("feedback").innerText =
        "";


    document.getElementById("nextBtn").style.display =
        "none";


    const options =
        document.getElementById("options");


    options.innerHTML = "";


    mission.options.forEach(function (option, index) {

        const button =
            document.createElement("button");


        button.className =
            "option-btn";


        button.innerText =
            option;


        button.onclick = function () {

            checkAnswer(index);

        };


        options.appendChild(button);

    });


    document.getElementById("lives").innerText =
        lives;


    document.getElementById("score").innerText =
        score;

}


// Check answer

function checkAnswer(selectedAnswer) {

    if (answered) {

        return;

    }


    answered = true;


    const mission =
        missions[currentQuestion];


    const feedback =
        document.getElementById("feedback");


    const buttons =
        document.querySelectorAll(".option-btn");


    buttons.forEach(function (button) {

        button.disabled = true;

    });


    if (selectedAnswer === mission.answer) {

        score += 20;


        feedback.innerText =
            "✅ Correct! You protected the system.";

        feedback.style.color =
            "green";

    }

    else {

        lives--;


        feedback.innerText =
            "❌ Wrong decision! You lost one life.";

        feedback.style.color =
            "red";


        if (lives <= 0) {

            finishQuiz();

            return;

        }

    }


    document.getElementById("lives").innerText =
        lives;


    document.getElementById("score").innerText =
        score;


    if (currentQuestion < missions.length - 1) {

        document.getElementById("nextBtn").style.display =
            "block";

    }

    else {

        setTimeout(function () {

            finishQuiz();

        }, 800);

    }

}


// Next question

function nextQuestion() {

    currentQuestion++;

    loadQuestion();

}


// Finish quiz

function finishQuiz() {

    document.querySelector(".mission-box").style.display =
        "none";


    document.getElementById("finalReport").style.display =
        "block";


    document.getElementById("finalScore").innerText =
        "🛡️ Security Score: " + score;


    let rank;


    if (score >= 120) {

        rank =
            "🏆 Cyber Security Expert";

    }

    else if (score >= 80) {

        rank =
            "🥇 Security Defender";

    }

    else if (score >= 40) {

        rank =
            "🥈 Security Trainee";

    }

    else {

        rank =
            "🥉 Beginner";

    }


    document.getElementById("rank").innerText =
        "🎖️ Rank: " + rank;


    document.getElementById("report").innerText =
        "❤️ Lives Remaining: " + lives +
        " | 🎯 Questions Completed: " +
        (currentQuestion + 1);


    // Save score to Flask backend

    fetch("http://127.0.0.1:5000/api/save-score", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            module: "Cyber Security Mission",

            score: score

        })

    })

    .then(function (response) {

        return response.json();

    })

    .then(function (data) {

        console.log(data.message);

    })

    .catch(function (error) {

        console.log(
            "Backend connection failed:",
            error
        );

    });

}


// Restart quiz

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    lives = 3;


    document.getElementById("finalReport").style.display =
        "none";


    document.querySelector(".mission-box").style.display =
        "block";


    shuffleQuestions();

    loadQuestion();

}


// Start

shuffleQuestions();

loadQuestion();