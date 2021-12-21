/* NAVBAR DEPENDING ON USER LOGGED IN OR NOT */
if (window.location.href === "http://localhost:8080/create-user.html" || window.location.href === "http://localhost:8080/login.html?") {
         let navbarLoggedIn = document.getElementById("btn-login")
         navbarLoggedIn.remove()

         let navbarLoggedOut = document.getElementById("btn-logout")
         navbarLoggedOut.remove()
    }

else if (localStorage.getItem("user") !== null) {
    console.log("user in session")
    let navbarLoggedIn = document.getElementById("btn-login")
    navbarLoggedIn.remove()

} else {
    console.log("user not in session")
    let navbarLoggedOut = document.getElementById("btn-logout")
    navbarLoggedOut.remove()
}

function indexSession() {
    if (localStorage.getItem("user")  !== null) {
        console.log("user in session: " + localStorage.getItem("user"))
        let notLoggedInText = document.getElementById("div-not-logged-in")
        notLoggedInText.remove()
    } else {
        console.log("not in session")
        let loggedInBtns = document.getElementById("div-logged-in")
        loggedInBtns.remove();
    }
}

function endSession() {
    localStorage.removeItem("user");
}
