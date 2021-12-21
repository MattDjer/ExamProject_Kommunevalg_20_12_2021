function sortParties(candidates) {

    let select = document.getElementById('candidate-party');
    let partySelected = select.options[select.selectedIndex].innerHTML;

    let table_overview = document.getElementById("table")

    // Clear Div
    table_overview.innerHTML = "";

    let nameTh = document.createElement("th")
    nameTh.innerHTML = "Navn"
    let votesTh = document.createElement("th")
    votesTh.innerHTML = "Stemmer"
    let partyTh = document.createElement("th")
    partyTh.innerHTML = "Parti"
    table_overview.appendChild(nameTh)
    table_overview.appendChild(votesTh)
    table_overview.appendChild(partyTh)

    let countOfShownMembers = 0;

    if (partySelected === "--") {
        showAll()
    } else {
        // Recreate TABLE with SORTED values
        for (let candidate of candidates) {
            if (candidate.party.name === partySelected) {
                countOfShownMembers += 1

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

                tr.appendChild(candidateNameTd)
                tr.appendChild(votesTd);
                tr.appendChild(partyTd);
                table_overview.appendChild(tr)
            }
        }
    }
    searchNotFound(countOfShownMembers)
}


function searchNotFound(count) {
    if (count === 0) {
        let table_overview = document.getElementById("table")
        table_overview.innerHTML = "";
        table_overview.innerHTML = "Ingen partimedlemmer fundet"
    }
}


function fetchCandidatesSorting() {
    const url = "http://localhost:8080/api/candidate-overview";
    fetch(url).then(response => response.json()).then(data => {
        candidates = data;
        sortParties(data)
    })
        .catch(error => console.log(error));
}

function showAll() {
    window.location.href = "http://localhost:8080/candidate-overview.html";
}


