let candidates;

function fetchCandidates() {
    const url = "http://localhost:8080/api/candidate-overview";
    fetch(url).then(response => response.json()).then(data => {
        candidates = data;
        getCandidatesAndParties(data)
    })
        .catch(error => console.log(error));
}


function getCandidatesAndParties(candidates) {
    document.getElementById("candidate-container").innerHTML = "";

    let col = document.createElement("div");
    col.setAttribute("class", "jumbotron");

    let card = document.createElement("div");
    card.setAttribute("class", "card");

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    let table = getTableHeader()

    for (let candidate of candidates) {

        let tr = document.createElement("tr")
        tr.style.marginTop = '10px';

        let candidateNameTd = document.createElement("td")
        let candidateNameText = document.createTextNode(candidate.candidateName);
        candidateNameTd.setAttribute("class", "name");
        candidateNameTd.appendChild(candidateNameText);

        let votesTd = document.createElement("td")
        let candidateVotesText = document.createTextNode(candidate.numberOfVotes);
        votesTd.setAttribute("class", "votes");
        votesTd.appendChild(candidateVotesText);

        let partyTd = document.createElement("td");
        let partyText = document.createTextNode(candidate.party.name);
        partyTd.setAttribute("class", "party");
        partyTd.appendChild(partyText);

        let infoButtonTd = getInfoButton(candidate, "Rediger", editCandidate)
        let deleteButtonTd = getDeleteButton(candidate)

        document.getElementById("candidate-container").appendChild(col);
        col.appendChild(card);
        card.appendChild(cardBody);
        cardBody.appendChild(table)
        table.appendChild(tr)
        tr.appendChild(candidateNameTd)
        tr.appendChild(votesTd);
        tr.appendChild(partyTd);
        tr.appendChild(infoButtonTd);
        tr.appendChild(deleteButtonTd);
    }
    getParties()
}

let parties;

function getParties() {
    const url = "http://localhost:8080/api/get-parties";
    fetch(url).then(response => response.json()).then(data => {parties = data; insertSelectOptionsForParties(data)})
        .catch(error => console.log(error));
}

function insertSelectOptionsForParties(parties) {
    let partySelect = document.getElementById("candidate-party")
    let option0 = document.createElement("option")
    partySelect.appendChild(option0)
    option0.setAttribute("value", "--")
    option0.innerHTML = "--";
    option0.style.textAlign = "center";
    for (let party of parties) {
            let option2 = document.createElement("option")
            option2.setAttribute("value", party.partyId)

            option2.innerHTML = party.name
            partySelect.appendChild(option2)
        }
}


function deleteCandidate(event) {
    const candidateToDelete = event.target.id;
    console.log("delete id: " + event.target.id)

    let deleteRequest = {
        method: "DELETE",
    }

    let url = "http://localhost:8080/api/delete-candidate/" + candidateToDelete;

    fetch(url, deleteRequest).then(() => {
        fetchCandidates()
    }).catch(error => console.log(error));
}


function saveChanges(event) {
    let name = document.getElementById("candidate-name-edit").value;
    let votes = document.getElementById("candidate-votes-edit").value;
    let partyId = document.getElementById("hiddenPartyId").value;

    let party = {
        partyId : partyId
    }

    let candidate = {
        id : event.target.id,
        candidateName : name,
        numberOfVotes : votes,
        party : party
    }

    const candidateJSON = JSON.stringify(candidate);

    let postRequest = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: candidateJSON
    }

    fetch("http://localhost:8080/api/save-candidate-changes", postRequest)
        .then( () => refreshPage()).catch(error => console.log(error));
}


function refreshPage() {
    if (window.location.href === "http://localhost:8080/create-candidate.html") {
        window.location.href="http://localhost:8080/create-candidate.html"
    }
        else {
        window.location.href="http://localhost:8080/candidate-overview.html"
    }

}


function editCandidate(event) {
    const candidateToEdit = event.target.id;
    console.log(event.target.id)

    let editRequest = {
        method: "POST",
    }

    let url = "http://localhost:8080/api/find-candidate/" + candidateToEdit;

    fetch(url, editRequest).then(response => response.json()).then(data => {
        editCandidatePage(data)
    }).catch(error => console.log(error));
}

function editCandidatePage(candidate) {

    console.log(candidate.party.partyId)

    document.getElementById("candidate-container").innerHTML = "";

    let col = document.createElement("div");
    col.setAttribute("class", "jumbotron");

    let card = document.createElement("div");
    card.setAttribute("class", "card");

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    let table = getTableHeader()

    let tr = document.createElement("tr")
    tr.style.marginTop = '10px';

    let candidateNameInput = document.createElement("input")
    candidateNameInput.setAttribute("type", "text")
    candidateNameInput.setAttribute("class", "input-field-name")
    candidateNameInput.setAttribute("id", "candidate-name-edit")
    candidateNameInput.setAttribute("value", candidate.candidateName)

    let candidateNameTd = document.createElement("td")
    let candidateNameText = document.createTextNode(candidate.candidateName);
    candidateNameTd.setAttribute("class", "card-title");
    candidateNameTd.appendChild(candidateNameInput);
    candidateNameInput.appendChild(candidateNameText)

    let candidateVotesInput = document.createElement("input")
    candidateVotesInput.setAttribute("type", "text")
    candidateVotesInput.setAttribute("class", "input-field-votes")
    candidateVotesInput.setAttribute("id", "candidate-votes-edit")
    candidateVotesInput.setAttribute("value", candidate.numberOfVotes)

    let candidateVotesTd = document.createElement("td")
    let candidateVotesText = document.createTextNode(candidate.votes);
    candidateVotesTd.setAttribute("class", "card-title");
    candidateVotesTd.appendChild(candidateVotesInput);
    candidateVotesInput.appendChild(candidateVotesText)

    let partyIdHidden = document.createElement("input")
    partyIdHidden.setAttribute("type", "hidden")
    partyIdHidden.setAttribute("value", candidate.party.partyId)
    partyIdHidden.setAttribute("id", "hiddenPartyId")

    let candidatePartyInput = document.createElement("input")
    candidatePartyInput.setAttribute("type", "text")
    candidatePartyInput.setAttribute("class", "input-field-party")
    candidatePartyInput.setAttribute("id", "candidate-party-edit")
    candidatePartyInput.setAttribute("value", candidate.party.name)


    let candidatePartyTd = document.createElement("td");
    let partyText = document.createTextNode(candidate.party);
    candidatePartyTd.setAttribute("class", "card-text");
    candidatePartyTd.appendChild(candidatePartyInput);
    candidatePartyInput.appendChild(partyIdHidden)
    candidatePartyInput.appendChild(partyText)

   let saveButtonTd = getInfoButton(candidate, "Gem", saveChanges)

    document.getElementById("candidate-container").appendChild(col);
    col.appendChild(card);
    card.appendChild(cardBody);
    tr.appendChild(candidateNameTd);
    tr.appendChild(candidateVotesTd)
    tr.appendChild(candidatePartyTd);
    tr.appendChild(saveButtonTd)

    table.appendChild(tr)
    cardBody.appendChild(table)
}


function getTableHeader() {
    let table = document.createElement("table")
    table.setAttribute("id", "table")
    let nameTh = document.createElement("th")
    nameTh.innerHTML = "Navn"
    let votesTh = document.createElement("th")
    votesTh.innerHTML = "Stemmer"
    let partyTh = document.createElement("th")
    partyTh.innerHTML = "Parti"
    table.appendChild(nameTh)
    table.appendChild(votesTh)
    table.appendChild(partyTh)

    return table;
}


function getInfoButton(candidate, buttonName, methodCall) {

    let infoButtonTd = document.createElement("td")
    let infoButton = document.createElement("button");
    infoButton.setAttribute("id", candidate.id);
    infoButton.addEventListener("click", methodCall);
    infoButton.setAttribute("class", "btn btn-outline-primary");
    infoButton.style.marginLeft = "10px";
    let buttonText = document.createTextNode(buttonName);
    infoButtonTd.appendChild(infoButton)
    infoButton.appendChild(buttonText);

    return infoButton
}

function getDeleteButton(candidate) {
    let deleteButtonTd = document.createElement("td")
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", candidate.id);
    deleteButton.setAttribute("class", "btn btn-outline-danger");
    deleteButton.style.marginLeft = "10px"
    let deleteButtonText = document.createTextNode("Slet");
    deleteButton.addEventListener("click", deleteCandidate);
    deleteButtonTd.appendChild(deleteButton)
    deleteButton.appendChild(deleteButtonText);

    return deleteButtonTd
}

