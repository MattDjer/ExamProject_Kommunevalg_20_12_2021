function sortParties() {
    var select = document.getElementById('candidate-party');
    var partySelected = select.options[select.selectedIndex].innerHTML;
    console.log(partySelected);
    // We need to get the values before removing them so we can recreate table
    let nameOfCandidate = document.querySelectorAll(".name")
    let numberOfVotes = document.querySelectorAll(".votes")
    let party = document.querySelectorAll(".party")

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

    if (partySelected === "--") {
        showAll()
    } else {
        // Recreate TABLE with SORTED values
        for (let i = 0; i < nameOfCandidate.length; i++) {
            if (party[i].innerHTML === partySelected) {
                let tr = document.createElement("tr")
                tr.style.marginTop = '10px';

                let candidateNameTd = document.createElement("td")
                let candidateNameText = document.createTextNode(nameOfCandidate[i].innerHTML);
                candidateNameTd.setAttribute("class", "name");
                candidateNameTd.appendChild(candidateNameText);

                let votesTd = document.createElement("td")
                let candidateVotesText = document.createTextNode(numberOfVotes[i].innerHTML);
                votesTd.setAttribute("class", "votes");
                votesTd.appendChild(candidateVotesText);

                let partyTd = document.createElement("td");
                let partyText = document.createTextNode(party[i].innerHTML);
                partyTd.setAttribute("class", "party");
                partyTd.appendChild(partyText);

                tr.appendChild(candidateNameTd)
                tr.appendChild(votesTd);
                tr.appendChild(partyTd);
                table_overview.appendChild(tr)
            }
        }
    }
}

function showAll() {
    window.location.href = "http://localhost:8080/candidate-overview.html";
}