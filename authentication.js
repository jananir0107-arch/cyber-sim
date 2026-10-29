function authenticateUser() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const result = document.getElementById("authResult");

    if (username === "" || password === "") {
        result.innerHTML = "⚠️ Please enter both username and password.";
        result.style.color = "orange";
        return;
    }

    if (username === "admin" && password === "Cyber@123") {

        result.innerHTML =
            "✅ Authentication Successful!<br>" +
            "🔓 Access Granted.";

        result.style.color = "green";

    } else {

        result.innerHTML =
            "❌ Authentication Failed!<br>" +
            "🚫 Invalid username or password.";

        result.style.color = "red";
    }
}

