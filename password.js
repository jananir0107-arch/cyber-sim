function checkPassword() {
    const password = document.getElementById("password").value;

    const strength = document.getElementById("strength");
    const strengthText = document.getElementById("strengthText");

    const length = document.getElementById("length");
    const uppercase = document.getElementById("uppercase");
    const lowercase = document.getElementById("lowercase");
    const number = document.getElementById("number");
    const special = document.getElementById("special");

    let score = 0;

    // Check length
    if (password.length >= 8) {
        length.innerHTML = "✅ At least 8 characters";
        score++;
    } else {
        length.innerHTML = "❌ At least 8 characters";
    }

    // Check uppercase
    if (/[A-Z]/.test(password)) {
        uppercase.innerHTML = "✅ Contains uppercase letter";
        score++;
    } else {
        uppercase.innerHTML = "❌ Contains uppercase letter";
    }

    // Check lowercase
    if (/[a-z]/.test(password)) {
        lowercase.innerHTML = "✅ Contains lowercase letter";
        score++;
    } else {
        lowercase.innerHTML = "❌ Contains lowercase letter";
    }

    // Check number
    if (/[0-9]/.test(password)) {
        number.innerHTML = "✅ Contains a number";
        score++;
    } else {
        number.innerHTML = "❌ Contains a number";
    }

    // Check special character
    if (/[^A-Za-z0-9]/.test(password)) {
        special.innerHTML = "✅ Contains special character";
        score++;
    } else {
        special.innerHTML = "❌ Contains special character";
    }

    // Show password strength
    if (password.length === 0) {
        strength.style.width = "0%";
        strengthText.innerHTML = "Password Strength: —";
    }
    else if (score <= 2) {
        strength.style.width = "30%";
        strengthText.innerHTML = "Password Strength: Weak";
    }
    else if (score === 3 || score === 4) {
        strength.style.width = "65%";
        strengthText.innerHTML = "Password Strength: Medium";
    }
    else if (score === 5) {
        strength.style.width = "100%";
        strengthText.innerHTML = "Password Strength: Strong";
    }
}


function togglePassword() {
    const passwordInput = document.getElementById("password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}
