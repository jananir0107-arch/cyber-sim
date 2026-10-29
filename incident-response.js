const incidents = [
    {
        title: "🦠 Malware Attack",
        description: "Malware has been detected on a company computer.",
        order: ["detect", "contain", "analyze", "recover"],
        consequences: {
            detect: {
                message: "🔍 Malware activity identified successfully.",
                score: 15,
                evidence: 1
            },
            contain: {
                message: "🔌 Infected computer isolated before the malware could spread.",
                score: 25,
                evidence: 1
            },
            analyze: {
                message: "🧠 Malware behavior and affected files were analyzed.",
                score: 15,
                evidence: 1
            },
            recover: {
                message: "🛠️ System cleaned and safely restored.",
                score: 20,
                evidence: 0
            }
        }
    },

    {
        title: "🎣 Phishing Attack",
        description: "An employee has reported a suspicious email.",
        order: ["analyze", "detect", "contain", "recover"],
        consequences: {
            analyze: {
                message: "🧠 Email headers and sender information analyzed.",
                score: 20,
                evidence: 1
            },
            detect: {
                message: "🔍 Phishing email successfully identified.",
                score: 15,
                evidence: 1
            },
            contain: {
                message: "🔌 Malicious email blocked from reaching other users.",
                score: 25,
                evidence: 1
            },
            recover: {
                message: "🛠️ Affected account secured and normal access restored.",
                score: 15,
                evidence: 0
            }
        }
    },

    {
        title: "🔐 Password Breach",
        description: "A user's password may have been exposed.",
        order: ["contain", "detect", "analyze", "recover"],
        consequences: {
            contain: {
                message: "🔌 Account temporarily locked to prevent unauthorized access.",
                score: 25,
                evidence: 1
            },
            detect: {
                message: "🔍 Suspicious login activity identified.",
                score: 15,
                evidence: 1
            },
            analyze: {
                message: "🧠 Login records were analyzed to identify the breach.",
                score: 20,
                evidence: 1
            },
            recover: {
                message: "🛠️ Password reset and multi-factor authentication enabled.",
                score: 20,
                evidence: 0
            }
        }
    },

    {
        title: "📁 Ransomware Attack",
        description: "Files on a computer are being encrypted unexpectedly.",
        order: ["contain", "recover", "detect", "analyze"],
        consequences: {
            contain: {
                message: "🔌 System isolated and ransomware spread stopped.",
                score: 30,
                evidence: 1
            },
            recover: {
                message: "🛠️ Important files restored from a safe backup.",
                score: 20,
                evidence: 0
            },
            detect: {
                message: "🔍 Ransomware activity and encrypted files identified.",
                score: 15,
                evidence: 1
            },
            analyze: {
                message: "🧠 Attack source and affected files analyzed.",
                score: 15,
                evidence: 1
            }
        }
    }
];


let currentIncident;
let currentStepIndex = 0;
let score = 0;
let evidence = 0;


function newIncident() {

    currentIncident =
        incidents[Math.floor(Math.random() * incidents.length)];

    currentStepIndex = 0;
    score = 50;
    evidence = 0;

    document.getElementById("incidentTitle").innerText =
        currentIncident.title;

    document.getElementById("incidentDescription").innerText =
        currentIncident.description;

    document.getElementById("currentStep").innerText =
        getStepName(currentIncident.order[0]);

    document.getElementById("responseProgress").value = 0;

    document.getElementById("progressText").innerText =
        "0% Complete";

    document.getElementById("responseStatus").innerText =
        "🚨 Incident detected. Choose the required response.";

    document.getElementById("responseStatus").style.color =
        "orange";

    document.getElementById("responseResult").innerText =
        "Security Score: 50 | Evidence: 0";

    updateInfo();
}


function performAction(action) {

    const expectedAction =
        currentIncident.order[currentStepIndex];

    const status =
        document.getElementById("responseStatus");

    const result =
        document.getElementById("responseResult");


    // Correct action

    if (action === expectedAction) {

        const actionData =
            currentIncident.consequences[action];

        score += actionData.score;
        evidence += actionData.evidence;

        currentStepIndex++;

        status.innerText =
            "✅ " + actionData.message;

        status.style.color = "green";


        const progress =
            (currentStepIndex / currentIncident.order.length) * 100;

        document.getElementById("responseProgress").value =
            progress;

        document.getElementById("progressText").innerText =
            progress + "% Complete";


        if (currentStepIndex <
            currentIncident.order.length) {

            document.getElementById("currentStep").innerText =
                getStepName(
                    currentIncident.order[currentStepIndex]
                );

        } else {

            document.getElementById("currentStep").innerText =
                "Completed";

            document.getElementById("incidentTitle").innerText =
                "🟢 Incident Resolved";

            document.getElementById("incidentDescription").innerText =
                "The incident has been successfully handled.";

            status.innerText =
                "🎉 All response actions completed!";

            result.innerText =
                "Final Security Score: " +
                score +
                " | Evidence Collected: " +
                evidence;

            result.style.color = "green";

            return;
        }

    }


    // Wrong action

    else {

        score -= 5;

        status.innerText =
            "⚠️ Not the best action for this situation. " +
            "Think about the current incident and try again.";

        status.style.color = "red";
    }


    updateInfo();
}


function getStepName(action) {

    if (action === "detect") {
        return "🔍 Detect";
    }

    if (action === "analyze") {
        return "🧠 Analyze";
    }

    if (action === "contain") {
        return "🔌 Contain";
    }

    if (action === "recover") {
        return "🛠️ Recover";
    }
}


function updateInfo() {

    document.getElementById("scoreDisplay").innerText =
        score;

    document.getElementById("evidenceDisplay").innerText =
        evidence;

    document.getElementById("actionDisplay").innerText =
        currentStepIndex + " / 4";
}


newIncident();