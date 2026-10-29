const warningPatterns = [
    {
        pattern: /\burgent\b|\bimmediately\b|\bact now\b/i,
        label: "Urgent or pressure-based language",
        points: 15
    },
    {
        pattern: /\bverify your account\b|\baccount suspended\b|\baccount blocked\b/i,
        label: "Account verification or suspension warning",
        points: 25
    },
    {
        pattern: /\bpassword\b|\bOTP\b|\bone[- ]time password\b|\bPIN\b/i,
        label: "Password, OTP or PIN requested or mentioned",
        points: 20
    },
    {
        pattern: /\bclick here\b|\bopen this link\b|\bclick the link\b/i,
        label: "Message urges the reader to click a link",
        points: 15
    },
    {
        pattern: /\bwon a prize\b|\byou have won\b|\bfree gift\b|\bclaim your reward\b/i,
        label: "Unexpected prize or reward",
        points: 20
    },
    {
        pattern: /\bbank account\b|\bpayment failed\b|\brefund pending\b/i,
        label: "Financial account or payment-related language",
        points: 10
    },
    {
        pattern: /https?:\/\/|www\./i,
        label: "Contains a web address that should be checked carefully",
        points: 10
    }
];

let messagesScanned = 0;
let highRiskCount = 0;

const challenges = [
    {
        question: "Your bank unexpectedly asks you to share an OTP by replying to an SMS. What should you do?",
        options: [
            "Reply with the OTP",
            "Share only part of the OTP",
            "Do not share it; contact the bank through an official channel",
            "Forward the OTP to a friend"
        ],
        answer: 2,
        explanation: "Never share an OTP with someone who contacts you unexpectedly."
    },
    {
        question: "An email claims you won a prize but asks for your bank details to claim it. What is the safest response?",
        options: [
            "Enter the bank details",
            "Treat it as suspicious and verify independently",
            "Forward it to everyone",
            "Send your password"
        ],
        answer: 1,
        explanation: "Unexpected prizes that request sensitive information are a warning sign."
    },
    {
        question: "A message says your account will be closed unless you act immediately. What should you do?",
        options: [
            "Click its link immediately",
            "Enter your password",
            "Verify the claim using the official website or app",
            "Share your login details"
        ],
        answer: 2,
        explanation: "Check urgent account warnings through an official channel rather than the message link."
    },
    {
        question: "A message has correct spelling and your name. Does that prove it is genuine?",
        options: [
            "Yes, always",
            "Yes, if it looks professional",
            "No, verify the sender and request independently",
            "Yes, if it contains a logo"
        ],
        answer: 2,
        explanation: "Scammers can use names, logos and professional wording too."
    },
    {
        question: "What is the safest way to open your bank website after receiving a message?",
        options: [
            "Use the link in the message",
            "Search for an unofficial shortened link",
            "Use the official app or enter the known website address yourself",
            "Ask the sender for a password"
        ],
        answer: 2,
        explanation: "Using a known official channel reduces the risk of visiting a fake website."
    }
];

let currentChallenge = 0;
let challengeScore = 0;
let challengeAnswered = false;


// Scan a message

function scanMessage() {
    const message = document.getElementById("emailMessage").value.trim();
    const result = document.getElementById("scanResult");
    const flags = document.getElementById("redFlags");

    if (!message) {
        result.innerText = "⚠️ Please enter a message first.";
        result.style.color = "orange";
        return;
    }

    let score = 0;
    let foundFlags = [];

    warningPatterns.forEach(function (item) {
        if (item.pattern.test(message)) {
            score += item.points;
            foundFlags.push(item.label);
        }
    });

    score = Math.min(score, 100);

    messagesScanned++;

    if (score >= 50) {
        highRiskCount++;
    }

    document.getElementById("riskScore").innerText = score;
    document.getElementById("messagesScanned").innerText = messagesScanned;
    document.getElementById("highRiskCount").innerText = highRiskCount;
    document.getElementById("riskMeter").value = score;

    if (score >= 50) {
        result.innerText = "🔴 HIGH RISK: Several warning signs were found.";
        result.style.color = "red";

        document.getElementById("riskExplanation").innerText =
            "Treat this message as suspicious. Do not click links or share sensitive information.";
    } else if (score >= 25) {
        result.innerText = "🟠 MEDIUM RISK: Some warning signs were found.";
        result.style.color = "orange";

        document.getElementById("riskExplanation").innerText =
            "Verify the sender and the request using an independent, trusted channel.";
    } else {
        result.innerText = "🟢 LOW DETECTED RISK: Few listed warning signs were found.";
        result.style.color = "green";

        document.getElementById("riskExplanation").innerText =
            "This message triggered fewer rules. That does not prove it is safe.";
    }

    flags.innerHTML = "";

    if (foundFlags.length === 0) {
        flags.innerHTML =
            "<div class='safe-sign'>No listed warning patterns were detected. A message can still be fraudulent.</div>";
    } else {
        foundFlags.forEach(function (flag) {
            const item = document.createElement("div");
            item.className = "red-flag";
            item.innerText = "🚩 " + flag;
            flags.appendChild(item);
        });
    }

    addHistory(score, message, foundFlags.length);
}


// Load a harmless example message

function loadSample() {
    document.getElementById("emailMessage").value =
        "URGENT! Your bank account will be blocked today. Click here to verify your password and claim your reward: http://example.invalid";
}


// Clear scanner

function clearScanner() {
    document.getElementById("emailMessage").value = "";
    document.getElementById("scanResult").innerText =
        "Waiting for a message to investigate.";
    document.getElementById("riskScore").innerText = "--";
    document.getElementById("riskMeter").value = 0;
    document.getElementById("riskExplanation").innerText =
        "Scan a message to see its risk assessment.";
    document.getElementById("redFlags").innerHTML =
        "<p>No investigation performed yet.</p>";
}


// Add to history

function addHistory(score, message, flagCount) {
    const history = document.getElementById("investigationHistory");

    if (history.querySelector("p")) {
        history.innerHTML = "";
    }

    const entry = document.createElement("div");
    entry.className = "history-entry";

    const level =
        score >= 50 ? "HIGH RISK" :
        score >= 25 ? "MEDIUM RISK" :
        "LOW DETECTED RISK";

    const summary = document.createElement("strong");
    summary.innerText =
        new Date().toLocaleTimeString() +
        " — " + level +
        " — Score: " + score + "/100";

    const details = document.createElement("p");
    details.innerText =
        "Warning signs: " + flagCount +
        " | Message: " + message;

    entry.appendChild(summary);
    entry.appendChild(details);

    history.prepend(entry);

    // Keep the newest 10 entries only.
    while (history.children.length > 10) {
        history.removeChild(history.lastElementChild);
    }
}


// Clear history

function clearHistory() {
    document.getElementById("investigationHistory").innerHTML =
        "<p>Your scanned messages will appear here.</p>";
}


// Load challenge

function loadChallenge() {
    const challenge = challenges[currentChallenge];

    challengeAnswered = false;

    document.getElementById("challengeNumber").innerText =
        "Challenge " + (currentChallenge + 1) +
        " of " + challenges.length;

    document.getElementById("challengeQuestion").innerText =
        challenge.question;

    document.getElementById("challengeFeedback").innerText = "";

    document.getElementById("nextChallenge").style.display = "none";

    const optionsBox = document.getElementById("challengeOptions");
    optionsBox.innerHTML = "";

    challenge.options.forEach(function (option, index) {
        const button = document.createElement("button");

        button.className = "challenge-option";
        button.innerText = option;

        button.onclick = function () {
            checkChallengeAnswer(index);
        };

        optionsBox.appendChild(button);
    });
}


// Check challenge answer

function checkChallengeAnswer(selectedIndex) {
    if (challengeAnswered) {
        return;
    }

    challengeAnswered = true;

    const challenge = challenges[currentChallenge];
    const feedback = document.getElementById("challengeFeedback");

    const buttons =
        document.querySelectorAll(".challenge-option");

    buttons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedIndex === challenge.answer) {
        challengeScore++;

        feedback.innerText =
            "✅ Correct! " + challenge.explanation;

        feedback.style.color = "green";
    } else {
        feedback.innerText =
            "❌ Not quite. " + challenge.explanation;

        feedback.style.color = "red";
    }

    if (currentChallenge < challenges.length - 1) {
        document.getElementById("nextChallenge").style.display = "inline-block";
    } else {
        feedback.innerText +=
            " Challenge complete! Score: " +
            challengeScore + "/" + challenges.length;

        document.getElementById("nextChallenge").innerText =
            "🔄 Restart Challenge";

        document.getElementById("nextChallenge").style.display =
            "inline-block";
    }
}


// Next challenge

function nextChallenge() {
    if (currentChallenge < challenges.length - 1) {
        currentChallenge++;
        loadChallenge();
    } else {
        currentChallenge = 0;
        challengeScore = 0;

        document.getElementById("nextChallenge").innerText =
            "➡️ Next Challenge";

        loadChallenge();
    }
}


// Start module

loadChallenge();