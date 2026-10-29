let encryptedMessage = "";
let currentMethod = "";
let currentKey = "";
let securityScore = 50;


// 🔒 Encrypt Message

function encryptMessage() {

    const message =
        document.getElementById("message").value;

    const key =
        document.getElementById("key").value;

    const method =
        document.getElementById("method").value;


    if (message.trim() === "") {

        alert("⚠️ Please enter a secret message.");

        return;
    }


    if (method !== "base64" && key === "") {

        alert("⚠️ Please enter an encryption key.");

        return;
    }


    currentMethod = method;
    currentKey = key;


    if (method === "caesar") {

        encryptedMessage =
            caesarEncrypt(message, Number(key));

    }

    else if (method === "xor") {

        encryptedMessage =
            xorEncrypt(message, Number(key));

    }

    else if (method === "base64") {

        encryptedMessage =
            btoa(unescape(encodeURIComponent(message)));

    }


    document.getElementById("encryptedText").innerText =
        encryptedMessage;


    document.getElementById("encryptionStatus").innerText =
        "🔒 Encrypted";

    document.getElementById("keyStatus").innerText =
        method === "base64"
            ? "Not Required"
            : "🔑 Active";


    securityScore += 10;

    if (securityScore > 100) {
        securityScore = 100;
    }


    document.getElementById("securityScore").innerText =
        securityScore;
}


// 🔓 Decrypt Message

function decryptMessage() {

    if (encryptedMessage === "") {

        alert("⚠️ Encrypt a message first.");

        return;
    }


    let decrypted = "";


    if (currentMethod === "caesar") {

        decrypted =
            caesarDecrypt(
                encryptedMessage,
                Number(currentKey)
            );

    }

    else if (currentMethod === "xor") {

        decrypted =
            xorDecrypt(
                encryptedMessage,
                Number(currentKey)
            );

    }

    else if (currentMethod === "base64") {

        try {

            decrypted =
                decodeURIComponent(
                    escape(
                        atob(encryptedMessage)
                    )
                );

        }

        catch (error) {

            decrypted =
                "❌ Decryption failed.";

        }

    }


    document.getElementById("decryptedText").innerText =
        decrypted;
}


// 🔐 Caesar Encryption

function caesarEncrypt(text, key) {

    let result = "";

    for (let i = 0; i < text.length; i++) {

        let char = text[i];

        if (char >= "A" && char <= "Z") {

            result += String.fromCharCode(
                ((char.charCodeAt(0) - 65 + key) % 26) + 65
            );

        }

        else if (char >= "a" && char <= "z") {

            result += String.fromCharCode(
                ((char.charCodeAt(0) - 97 + key) % 26) + 97
            );

        }

        else {

            result += char;
        }
    }

    return result;
}


// 🔓 Caesar Decryption

function caesarDecrypt(text, key) {

    return caesarEncrypt(text, 26 - (key % 26));
}


// 🔐 XOR Encryption

function xorEncrypt(text, key) {

    let result = "";

    for (let i = 0; i < text.length; i++) {

        result += String.fromCharCode(
            text.charCodeAt(i) ^ key
        );
    }

    return btoa(result);
}


// 🔓 XOR Decryption

function xorDecrypt(text, key) {

    try {

        const decoded = atob(text);

        let result = "";

        for (let i = 0; i < decoded.length; i++) {

            result += String.fromCharCode(
                decoded.charCodeAt(i) ^ key
            );
        }

        return result;

    }

    catch (error) {

        return "❌ Wrong key or invalid encrypted data.";

    }
}


// 🕵️ Attack Simulation

function simulateAttack() {

    const result =
        document.getElementById("attackResult");


    if (encryptedMessage === "") {

        result.innerText =
            "⚠️ No encrypted message available.";

        result.style.color = "orange";

        return;
    }


    result.innerText =
        "🕵️ Attacker is trying to read the encrypted message...";

    result.style.color = "orange";


    setTimeout(function () {

        result.innerText =
            "❌ Attack Failed! Encryption protected the message.";

        result.style.color = "green";


        securityScore += 5;

        if (securityScore > 100) {
            securityScore = 100;
        }


        document.getElementById("securityScore").innerText =
            securityScore;

    }, 2000);
}