function startBackup() {

    const files = document.querySelectorAll(".backup-file");
    const selectedFiles = [];

    files.forEach(function(file) {
        if (file.checked) {
            selectedFiles.push(file.value);
        }
    });

    const status = document.getElementById("backupStatus");
    const progressContainer = document.getElementById("progressContainer");
    const progress = document.getElementById("backupProgress");
    const progressText = document.getElementById("progressText");
    const result = document.getElementById("backupResult");

    // Check whether a file is selected
    if (selectedFiles.length === 0) {
        status.innerHTML = "⚠️ Please select at least one file to back up.";
        status.style.color = "red";
        return;
    }

    // Start backup
    status.innerHTML = "🔄 Backup in progress...";
    status.style.color = "";

    result.innerHTML = "";
    progressContainer.style.display = "block";

    progress.value = 0;
    progressText.innerText = "0%";

    let percentage = 0;

    const backupProcess = setInterval(function() {

        percentage += 10;

        progress.value = percentage;
        progressText.innerText = percentage + "%";

        if (percentage >= 100) {

            clearInterval(backupProcess);

            status.innerHTML = "✅ Backup completed successfully!";
            status.style.color = "green";

            result.innerHTML =
                "📦 Backed up files: " +
                selectedFiles.join(", ") +
                "<br><br>" +
                "🛡️ Your selected data is now protected.";
        }

    }, 300);
}


