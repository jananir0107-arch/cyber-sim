const networkRequests = [
    {
        ip: "192.168.1.25",
        port: 443,
        protocol: "HTTPS",
        risk: "LOW",
        description: "Normal secure web connection."
    },

    {
        ip: "45.92.18.77",
        port: 22,
        protocol: "TCP",
        risk: "HIGH",
        description: "Suspicious remote login attempt detected."
    },

    {
        ip: "10.0.0.15",
        port: 80,
        protocol: "HTTP",
        risk: "MEDIUM",
        description: "Unencrypted web connection detected."
    },

    {
        ip: "172.16.0.20",
        port: 443,
        protocol: "HTTPS",
        risk: "LOW",
        description: "Trusted secure connection."
    },

    {
        ip: "103.45.77.91",
        port: 3389,
        protocol: "TCP",
        risk: "HIGH",
        description: "Suspicious remote desktop connection."
    },

    {
        ip: "192.168.1.50",
        port: 53,
        protocol: "UDP",
        risk: "LOW",
        description: "DNS request detected."
    }
];


let currentRequest;
let securityScore = 50;
let blocked = 0;
let allowed = 0;

let firewallRules = [];


function newRequest() {

    currentRequest =
        networkRequests[
            Math.floor(Math.random() * networkRequests.length)
        ];


    document.getElementById("requestTitle").innerText =
        "🚨 Incoming Network Request";


    document.getElementById("sourceIP").innerText =
        currentRequest.ip;


    document.getElementById("port").innerText =
        currentRequest.port;


    document.getElementById("protocol").innerText =
        currentRequest.protocol;


    document.getElementById("riskLevel").innerText =
        currentRequest.risk;


    document.getElementById("requestDescription").innerText =
        currentRequest.description;


    document.getElementById("firewallResult").innerText =
        "Choose Allow or Block.";


    document.getElementById("firewallResult").style.color =
        "";


    // Check existing firewall rule

    const rule = firewallRules.find(function (rule) {

        return (
            rule.protocol === currentRequest.protocol &&
            Number(rule.port) === Number(currentRequest.port)
        );

    });


    if (rule) {

        if (rule.action === "block") {

            blockRequest(true);

        } else {

            allowRequest(true);

        }

    }
}


function allowRequest(automatic = false) {

    allowed++;


    let correctDecision =
        currentRequest.risk === "LOW";


    if (correctDecision) {

        securityScore += 10;

        document.getElementById("firewallResult").innerText =
            automatic
                ? "⚙️ Firewall Rule Applied: Connection Automatically Allowed."
                : "✅ Correct Decision! Safe connection allowed.";

        document.getElementById("firewallResult").style.color =
            "green";

    } else {

        securityScore -= 10;

        document.getElementById("firewallResult").innerText =
            automatic
                ? "⚙️ Firewall Rule Applied: Connection Allowed, but risk is present."
                : "⚠️ Risky connection allowed! Security score decreased.";

        document.getElementById("firewallResult").style.color =
            "red";
    }


    updateDashboard();
}


function blockRequest(automatic = false) {

    blocked++;


    let correctDecision =
        currentRequest.risk === "HIGH";


    if (correctDecision) {

        securityScore += 15;

        document.getElementById("firewallResult").innerText =
            automatic
                ? "⚙️ Firewall Rule Applied: Dangerous connection automatically blocked."
                : "🛡️ Correct Decision! Threat blocked successfully.";

        document.getElementById("firewallResult").style.color =
            "green";

    } else {

        securityScore -= 5;

        document.getElementById("firewallResult").innerText =
            automatic
                ? "⚙️ Firewall Rule Applied: Connection blocked."
                : "⚠️ This connection was probably safe. Blocking it may affect normal traffic.";

        document.getElementById("firewallResult").style.color =
            "orange";
    }


    updateDashboard();
}


function createRule() {

    const protocol =
        document.getElementById("ruleProtocol").value;

    const port =
        document.getElementById("rulePort").value;

    const action =
        document.getElementById("ruleAction").value;

    const result =
        document.getElementById("ruleResult");


    if (port === "") {

        result.innerText =
            "⚠️ Please enter a port number.";

        result.style.color = "orange";

        return;
    }


    firewallRules.push({
        protocol: protocol,
        port: Number(port),
        action: action
    });


    result.innerText =
        "✅ Firewall rule added successfully!";


    result.style.color =
        "green";


    document.getElementById("rulePort").value =
        "";


    console.log("Firewall Rules:", firewallRules);
}


function updateDashboard() {

    document.getElementById("securityScore").innerText =
        securityScore;


    document.getElementById("blockedCount").innerText =
        blocked;


    document.getElementById("allowedCount").innerText =
        allowed;


    if (securityScore >= 80) {

        document.getElementById("networkStatus").innerText =
            "🟢 Secure";

    } else if (securityScore >= 50) {

        document.getElementById("networkStatus").innerText =
            "🟠 Protected";

    } else {

        document.getElementById("networkStatus").innerText =
            "🔴 At Risk";
    }
}


newRequest();