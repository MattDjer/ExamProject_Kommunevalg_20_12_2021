function postPartiesWithCandidates() {

    let name = document.getElementById("candidate-name").value;
    let votes = document.getElementById("candidate-votes").value;
    let partyId = document.getElementById("candidate-party").value;

    let party = {
        partyId : partyId
    }

    let candidate = {
        candidateName : name,
        numberOfVotes : votes,
        party : party
    }

    const partyJSON = JSON.stringify(candidate);

    let postRequest = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: partyJSON
    }

    fetch("http://localhost:8080/api/save-candidate", postRequest)
        .then( () => refreshPage()).catch( () => displayError());
}

function refreshPage() {
   window.location.href="http://localhost:8080/create-candidate.html"
}

function displayError() {
    document.getElementById("result").innerText = "Error: something went wrong";
    document.getElementById("result").style.display = "block";
}



