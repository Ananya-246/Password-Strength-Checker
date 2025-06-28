const passwordInput = document.querySelector(".srch");
const btn = document.getElementById("btn");
const feedback = document.getElementById("feedback");
const suggestions = document.getElementById("suggestions");
const meterFill = document.getElementById("meter-fill");

commonPwd = ["123456", "qwerty", "itsme", "admin", "abc123", "000000", "111111", "password"];

//submit button event
btn.addEventListener("click", (e)=>{
    e.preventDefault();
    pwd = passwordInput.value.trim();
    checkPassword(pwd);
    encryptPassword(pwd);
});

//It consider's Enter key
passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        pwd = passwordInput.value.trim();
        checkPassword(pwd);
        encryptPassword(pwd);
    }
});

function checkPassword(pwd){
    if(!pwd){
        feedback.innerHTML="Enter password";
        suggestions.innerHTML="";
        meterFill.style.width="0%";
        meterFill.style.backgroundColor="#ccc";
        return;
    }
    let count = 0;
    let suggestionList = [];

    if(commonPwd.includes(pwd.toLowerCase())){
        suggestionList.push("Most commonly used password!");
        count=0;
    }

    if(pwd.length>=12){
        count++;
    }
    else{
        suggestionList.push("Include atleast 12 characters");
    }

    if(/[A-Z]/.test(pwd)){
        count++;
    }
    else{
        suggestionList.push("Include UpperCase characters");
    }

    if(/[a-z]/.test(pwd)){
        count++;
    }
    
    if(/[0-9]/.test(pwd)){
        count++;
    }
    else{
        suggestionList.push("Include Numbers");
    }

    if(/[^A-Za-z0-9]/.test(pwd)){
        count++;
    }
    else{
        suggestionList.push("Include special characters");
    }

    meterFill.style.width = (count*20)+"%";
    meterFill.style.backgroundColor = count<2 ? "red" : count<4 ? "orange" : "green"; 

    feedback.innerHTML= count<=2 ? "❌Weak Password" : count<=4 ? "🆗Moderate Password" : "✔Strong Password";

    suggestions.innerHTML = suggestionList.length
    ? "<ul><li>" + suggestionList.join("</li><li>") + "</li></ul>"
    : "👍 Great job! Your password looks strong.";
}

async function encryptPassword(pwd) {
    const sha1 = await passwordHash(pwd);
    const prefix = sha1.substring(0, 5);
    const suffix = sha1.substring(5);

    try{
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const text = await response.text();

        if(text.includes(suffix)){
            feedback.innerHTML += " ⚠This password has been found in data breaches! Try something unique";
            meterFill.style.background = "darkred";
        }
    }
    catch(error){
        console.error("Error checking HIBP:", error);
        feedback.innerHTML += "Could not check password breaches (network issue).";
    }
}

async function passwordHash(pwd){
    const encoder = new TextEncoder();
    const data = encoder.encode(pwd); //This converts the string `pwd` into a Uint8Array of UTF-8 encoded bytes
    const hashPassword = await crypto.subtle.digest("SHA-1",data); //This hashes the UTF-8 byte data using SHA-1 and returns an ArrayBuffer containing the binary hash
    return Array.from(new Uint8Array(hashPassword)).map(b=>b.toString(16).padStart(2, "0")).join("").toUpperCase(); // Converts the binary SHA-1 hash (ArrayBuffer) into a Uint8Array (so we can access each byte), Array.from(...) converts it to a normal JS array so we can use .map(), Each byte is converted to a 2-digit hex string, joined, and capitalized to form the final hex hash
}