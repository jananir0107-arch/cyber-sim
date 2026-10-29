function generatePassword() {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    let password = "";

    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    document.getElementById("generatedPassword").value = password;
    document.getElementById("generatorResult").innerHTML =
        "✅ Strong password generated!";
}

function copyPassword() {
    const password = document.getElementById("generatedPassword").value;
    const result = document.getElementById("generatorResult");

    if (password === "") {
        result.innerHTML = "⚠️ Generate a password first.";
        return;
    }

    navigator.clipboard.writeText(password);

    result.innerHTML = "📋 Password copied!";
}