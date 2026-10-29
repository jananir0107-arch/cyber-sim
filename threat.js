const threats = [

    {
        title: "🦠 Malware Attack",
        description: "Suspicious malware activity has been detected.",
        ip: "45.92.18.77",
        type: "Malware",
        risk: "HIGH",
        system: "Employee Computer",
        correctAction: "isolate"
    },

    {
        title: "📁 Ransomware Attack",
        description: "Files are being encrypted unexpectedly.",
        ip: "103.45.77.91",
        type: "Ransomware",
        risk: "CRITICAL",
        system: "File Server",
        correctAction: "isolate"
    },

    {
        title: "🎣 Phishing Attack",
        description: "A suspicious email is attempting to steal credentials.",
        ip: "185.22.45.90",
        type: "Phishing",
        risk: "MEDIUM",
        system: "Email Server",
        correctAction: "block"
    },

    {
        title: "💥 DDoS Attack",
        description: "Large amounts of traffic are targeting the web server.",
        ip: "91.204.17.33",
        type: "DDoS",
        risk: "CRITICAL",
        system: "Web Server",
        correctAction: "block"
    },

    {
        title: "🔐 Brute Force Attack",
        description: "Multiple failed login attempts were detected.",
        ip: "78.45.92.11",
        type: "Brute Force",
        risk: "HIGH",
        system: "Authentication Server",
        correctAction: "block"
    },

    {
        title: "🕵️ Suspicious Activity",
        description: "Unusual activity has been detected on the network.",
        ip: "172.16.20.45",
        type: "Unknown Activity",
        risk: "MEDIUM",
        system: "Network Gateway",
        correctAction: "investigate"
    }

];


let currentThreat;

let securityScore = 50;

let threatsHandled = 0;

let investigations = 0;


// 🆕 Generate New Threat

function newThreat() {

    currentThreat =
        threats[
            Math.floor(Math.random() * threats.length)
        ];


    document.getElementById("threatTitle").innerText =
        currentThreat.title;


    document.getElementById("threatDescription").innerText =
        currentThreat.description;


    document.getElementById("sourceIP").innerText =
        currentThreat.ip;


    document.getElementById("attackType").innerText =
        currentThreat.type;


    document.getElementById("riskLevel").innerText =
        currentThreat.risk;


    document.getElementById("affectedSystem").innerText =
        currentThreat.system;


    document.getElementById("threatResult").innerText =
        "🚨 Threat detected. Choose your response.";

    document.getElementById("threatResult").style.color =
        "orange";

}


// 🎯 User Action

function takeAction(action) {

    const result =
        document.getElementById("threatResult");


    if (!currentThreat) {

        return;

    }


    if (action === currentThreat.correctAction) {

        threatsHandled++;


        if (action === "investigate") {

            investigations++;

            securityScore += 10;

            result.innerText =
                "🔍 Correct! Threat investigated successfully.";

        }


        else if (action === "block") {

            securityScore += 20;

            result.innerText =
                "🛡️ Excellent! Threat blocked successfully.";

        }


        else if (action === "isolate") {

            securityScore += 25;

            result.innerText =
                "🔌 Excellent! Affected system isolated and threat contained.";

        }


        else {

            securityScore += 5;

            result.innerText =
                "✅ Threat handled.";

        }


        result.style.color = "green";

    }


    else {

        securityScore -= 10;


        if (securityScore < 0) {

            securityScore = 0;

        }


        result.innerText =
            "⚠️ Incorrect response! The threat may still be active.";

        result.style.color = "red";

    }


    if (securityScore > 100) {

        securityScore = 100;

    }


    updateDashboard();

}


// 📊 Update Dashboard

function updateDashboard() {

    document.getElementById("securityScore").innerText =
        securityScore;


    document.getElementById("threatsHandled").innerText =
        threatsHandled;


    document.getElementById("investigations").innerText =
        investigations;

}


// Start Simulator

newThreat();