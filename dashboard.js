// Get saved progress
let challengesCompleted =
    Number(localStorage.getItem("challengesCompleted")) || 0;

let securityScore =
    Number(localStorage.getItem("securityScore")) || 0;


// Display progress
function updateDashboard() {

    const challengeElement = document.querySelector(
        ".stat-card:nth-child(2) h2"
    );

    const scoreElement = document.querySelector(
        ".stat-card:nth-child(3) h2"
    );

    if (challengeElement) {
        challengeElement.textContent = challengesCompleted;
    }

    if (scoreElement) {
        scoreElement.textContent = securityScore + "%";
    }
}


// Save score and refresh dashboard
function saveSecurityScore(score) {

    securityScore = Math.max(
        0,
        Math.min(100, Number(score) || 0)
    );

    localStorage.setItem("securityScore", securityScore);

    updateDashboard();
}


// Run when dashboard loads
updateDashboard();