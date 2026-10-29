
function analyzePassword() {

    const password = document.getElementById("userPassword").value;

    let score = 0;

    if (password.length >= 8) {
        score += 25;
    }

    if (password.length >= 12) {
        score += 15;
    }

    if (/[A-Z]/.test(password)) {
        score += 15;
    }

    if (/[a-z]/.test(password)) {
        score += 15;
    }

    if (/[0-9]/.test(password)) {
        score += 15;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score += 15;
    }

    if (score > 100) {
        score = 100;
    }

    document.getElementById("score").innerText = score + " / 100";

    const result = document.getElementById("result");

    if (score < 40) {
        result.innerText = "❌ Weak Password";
    }
    else if (score < 70) {
        result.innerText = "⚠️ Medium Password";
    }
    else {
        result.innerText = "✅ Strong Password";
    }

    document.getElementById("suggestion1").style.opacity =
        password.length >= 8 ? "0.4" : "1";

    document.getElementById("suggestion2").style.opacity =
        /[A-Z]/.test(password) && /[a-z]/.test(password) ? "0.4" : "1";

    document.getElementById("suggestion3").style.opacity =
        /[0-9]/.test(password) ? "0.4" : "1";

    document.getElementById("suggestion4").style.opacity =
        /[^A-Za-z0-9]/.test(password) ? "0.4" : "1";
}

