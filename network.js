const networkEvents = [

    {
        title: "🚨 Suspicious Login Attempt",
        description: "Multiple unusual login attempts detected.",
        source: "185.45.22.91",
        destination: "Authentication Server",
        protocol: "TCP",
        risk: "HIGH",
        correctAction: "block",
        device: "device2"
    },

    {
        title: "💥 DDoS Traffic Detected",
        description: "Large amount of traffic is targeting the web server.",
        source: "Unknown Network",
        destination: "Web Server",
        protocol: "TCP",
        risk: "CRITICAL",
        correctAction: "block",
        device: "device3"
    },

    {
        title: "🦠 Suspicious Malware Traffic",
        description: "A computer is communicating with a suspicious external server.",
        source: "192.168.1.20",
        destination: "45.92.18.77",
        protocol: "HTTP",
        risk: "HIGH",
        correctAction: "isolate",
        device: "device2"
    },

    {
        title: "📡 Unusual Network Activity",
        description: "Unexpected traffic pattern detected on the network.",
        source: "192.168.1.70",
        destination: "Unknown Server",
        protocol: "UDP",
        risk: "MEDIUM",
        correctAction: "scan",
        device: "device4"
    },

    {
        title: "🟢 Normal HTTPS Traffic",
        description: "Secure web communication detected.",
        source: "192.168.1.10",
        destination: "Trusted Website",
        protocol: "HTTPS",
        risk: "LOW",
        correctAction: "monitor",
        device: "device1"
    },

    {
        title: "🔐 Port Scanning Activity",
        description: "Multiple ports are being scanned from an unknown source.",
        source: "103.45.77.91",
        destination: "File Server",
        protocol: "TCP",
        risk: "HIGH",
        correctAction: "block",
        device: "device3"
    }

];


let currentEvent;

let securityScore = 50;

let threatCount = 0;

let devices = 4;


// Generate Event

function generateEvent() {

    currentEvent =
        networkEvents[
            Math.floor(
                Math.random() * networkEvents.length
            )
        ];


    document.getElementById("eventTitle").innerText =
        currentEvent.title;


    document.getElementById("eventDescription").innerText =
        currentEvent.description;


    document.getElementById("eventSource").innerText =
        currentEvent.source;


    document.getElementById("eventDestination").innerText =
        currentEvent.destination;


    document.getElementById("eventProtocol").innerText =
        currentEvent.protocol;


    document.getElementById("eventRisk").innerText =
        currentEvent.risk;


    document.getElementById("actionResult").innerText =
        "🚨 Analyze the event and choose an action.";


    document.getElementById("actionResult").style.color =
        "orange";


    highlightDevice(currentEvent.device);


    addLog(
        "🚨 " +
        currentEvent.title +
        " detected."
    );

}


// Device Highlight

function highlightDevice(deviceId) {

    const allDevices =
        document.querySelectorAll(".device");


    allDevices.forEach(function (device) {

        device.classList.remove("active");

    });


    const device =
        document.getElementById(deviceId);


    if (device) {

        device.classList.add("active");

    }

}


// Network Action

function networkAction(action) {

    const result =
        document.getElementById("actionResult");


    if (!currentEvent) {

        return;

    }


    if (action === currentEvent.correctAction) {

        if (action === "monitor") {

            securityScore += 10;

            result.innerText =
                "👁️ Correct! Network traffic is being monitored.";

        }


        else if (action === "block") {

            securityScore += 20;

            threatCount++;

            result.innerText =
                "🚫 Excellent! Suspicious connection blocked.";

        }


        else if (action === "isolate") {

            securityScore += 25;

            threatCount++;

            result.innerText =
                "🔌 Excellent! Device isolated successfully.";

        }


        else if (action === "scan") {

            securityScore += 15;

            result.innerText =
                "🔍 Correct! Network scan started.";

        }


        result.style.color =
            "green";


        addLog(
            "✅ Correct response: " +
            action
        );

    }


    else {

        securityScore -= 10;


        if (securityScore < 0) {

            securityScore = 0;

        }


        result.innerText =
            "⚠️ Wrong response! The network may still be at risk.";

        result.style.color =
            "red";


        addLog(
            "⚠️ Incorrect response: " +
            action
        );

    }


    if (securityScore > 100) {

        securityScore = 100;

    }


    updateDashboard();

}


// Network Scanner

function scanNetwork() {

    const progress =
        document.getElementById("scanProgress");

    const result =
        document.getElementById("scanResult");


    progress.value = 0;

    result.innerText =
        "🔍 Scanning network...";


    let value = 0;


    const scanner =
        setInterval(function () {

            value += 10;

            progress.value =
                value;


            if (value >= 100) {

                clearInterval(scanner);


                const suspicious =
                    Math.floor(
                        Math.random() * 3
                    );


                result.innerText =
                    "✅ Scan completed! " +
                    devices +
                    " devices scanned. " +
                    "⚠️ " +
                    suspicious +
                    " suspicious connection(s) found.";


                addLog(
                    "🔍 Network scan completed: " +
                    suspicious +
                    " suspicious connection(s)."
                );

            }

        }, 150);

}


// Dashboard Update

function updateDashboard() {

    document.getElementById("securityScore").innerText =
        securityScore;


    document.getElementById("threatCount").innerText =
        threatCount;
        
     localStorage.setItem("securityScore", securityScore);

    if (securityScore >= 80) {

        document.getElementById("networkStatus").innerText =
            "🟢 Secure";

    }

    else if (securityScore >= 50) {

        document.getElementById("networkStatus").innerText =
            "🟠 Warning";

    }

    else {

        document.getElementById("networkStatus").innerText =
            "🔴 Critical";

    }

}


// Event Log

function addLog(message) {

    const log =
        document.getElementById("eventLog");


    const entry =
        document.createElement("div");


    entry.className =
        "log-entry";


    const time =
        new Date().toLocaleTimeString();


    entry.innerText =
        time + " - " + message;


    log.prepend(entry);

}


// Start Network Center

generateEvent();