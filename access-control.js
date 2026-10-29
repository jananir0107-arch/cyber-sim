function checkAccess(role) {

    const result = document.getElementById("accessResult");

    if (role === "admin") {

        result.innerHTML =
            "✅ ACCESS GRANTED!<br>" +
            "Administrator has permission to access Security Settings.";

        result.style.color = "green";

    } else if (role === "employee") {

        result.innerHTML =
            "⚠️ ACCESS DENIED!<br>" +
            "Employee does not have permission to access Security Settings.";

        result.style.color = "red";

    } else if (role === "guest") {

        result.innerHTML =
            "🚫 ACCESS DENIED!<br>" +
            "Guest has limited permissions.";

        result.style.color = "red";
    }
}
