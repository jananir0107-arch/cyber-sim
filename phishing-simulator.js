const messages = [
    {
        sender: "Unknown Sender",
        subject: "Your bank account will be blocked!",
        message: "URGENT! Click here to verify your password and OTP.",
        phishing: true
    },
    {
        sender: "Security Team",
        subject: "Verify your account",
        message: "Your account is suspended. Verify your account immediately.",
        phishing: true
    },
    {
        sender: "CyberSim Training",
        subject: "Security Awareness",
        message: "Never share your password or OTP. Use the official bank app.",
        phishing: false
    },
    {
        sender: "Prize Notification",
        subject: "You won a prize!",
        message: "Send your bank details and OTP to claim your free reward.",
        phishing: true
    },
    {
        sender: "Online Safety Team",
        subject: "Create a strong password",
        message: "Use a unique password and enable two-factor authentication.",
        phishing: false
    }
];

let currentMessage = 0;
let totalScans = 0;
let phishingFound = 0;
let score = 0;
let investigated = false;
let answered = false;

function loadMessage() {
    const item = messages[currentMessage];

    document.getElementById("sender").textContent = item.sender;
    document.getElementById("subject").textContent = item.subject;
    document.getElementById("message").textContent = item.message;

    document.getElementById("result").textContent =
        "Read the message and investigate it.";

    document.getElementById("warningSigns").innerHTML =
        "<li>Click Investigate Message to begin.</li>";

    investigated = false;
    answered = false;
}

function investigateMessage() {
    if (investigated) {
        document.getElementById("result").textContent =
            "Already investigated! Choose Safe or Phishing.";
        return;
    }

    investigated = true;
    totalScans++;

    const item = messages[currentMessage];
    const warnings = document.getElementById("warningSigns");

    document.getElementById("totalScans").textContent = totalScans;

    warnings.innerHTML = "";

    const signs = item.phishing
        ? [
            "🚩 Suspicious or misleading message content.",
            "🚩 Check the sender independently.",
            "🚩 Do not share passwords or OTPs."
        ]
        : [
            "✅ No obvious phishing pattern in this training example.",
            "✅ The message provides general security advice."
        ];

    signs.forEach(function (sign) {
        const li = document.createElement("li");
        li.textContent = sign;
        warnings.appendChild(li);
    });

    document.getElementById("result").textContent =
        "Investigation complete! Decide whether this message is phishing or safe.";
}

function reportPhishing() {
    checkDecision(true);
}

function markSafe() {
    checkDecision(false);
}

function checkDecision(userChoice) {
    const result = document.getElementById("result");

    if (!investigated) {
        result.textContent = "⚠️ Click Investigate Message first.";
        return;
    }

    if (answered) {
        result.textContent = "You have already answered. Click Next Message.";
        return;
    }

    answered = true;

    const item = messages[currentMessage];

    if (userChoice === item.phishing) {
        score += 10;

        if (item.phishing) {
            phishingFound++;
        }

        result.textContent =
            "✅ Correct! You earned 10 points.";
    } else {
        score = Math.max(0, score - 5);

        result.textContent =
            "❌ Incorrect decision. You lost 5 points.";
    }

    result.textContent += item.phishing
        ? " This message is classified as phishing in the simulator."
        : " This message is classified as safe in the simulator.";

    document.getElementById("score").textContent = score;
    document.getElementById("phishingFound").textContent = phishingFound;
}

function nextMessage() {
    currentMessage = (currentMessage + 1) % messages.length;
    loadMessage();
}

function answerChallenge(choice) {
    const output = document.getElementById("challengeResult");

    if (answeredChallenge) {
        output.textContent = "Click Try Again to answer again.";
        return;
    }

    answeredChallenge = true;

    if (choice === 0) {
        score += 5;
        output.textContent =
            "✅ Correct! Never share an OTP with someone who contacts you unexpectedly.";
    } else if (choice === 1) {
        output.textContent =
            "❌ Checking through an official app is a safe practice.";
    } else {
        output.textContent =
            "❌ A unique password is good security practice, not a phishing warning sign.";
    }

    document.getElementById("score").textContent = score;
}

let answeredChallenge = false;

function resetChallenge() {
    answeredChallenge = false;
    document.getElementById("challengeResult").textContent = "";
}

loadMessage();