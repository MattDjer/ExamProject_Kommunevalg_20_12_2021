function login() {

    const name = document.getElementById("name").value;
    const user_password = document.getElementById("user_password").value;

    const user = {
        name : name,
        password : user_password,
    }

    const userJSON = JSON.stringify(user);

    let postRequest = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: userJSON
    }

    fetch("http://localhost:8080/api/login", postRequest).then(response => { if (!response.ok) throw new Error("Network error");
        return response.json(); }).then(data => setUserSession(data)).
    then( () => window.location.href = "http://localhost:8080/").catch( () => displayError());
}

/* Saves user in current session */
function setUserSession(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
    let user = JSON.parse(localStorage.getItem("user"));
}

function createUser() {
    const username = document.getElementById("name").value;
    const password = document.getElementById("user_password").value;

    const user = {
        name : username,
        password : password,
    }

    const userJSON = JSON.stringify(user);

    let postRequest = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: userJSON
    }

    fetch("http://localhost:8080/api/save-user", postRequest).then(response => { if (!response.ok) throw new Error("Network error");
        return response.json(); }).then( () => redirectLogin()).catch( () => displayError());
}

function redirectLogin() {
    if (window.confirm("User created - Continue to login")) {
        window.location.href="http://localhost:8080/login.html"
    }
}

function displayError() {
    document.getElementById("result").innerText = "Error: Wrong login credentials";
    document.getElementById("result").style.display = "block";
}
