let partyScores;

function fetchPartyScores() {

    const url = "http://localhost:8080/api/party-overview";
    fetch(url).then(response => response.json()).then(data => {
        partyScores = data;
        showPartyScores(data)
    })
        .catch(error => console.log(error));
}

function showPartyScores(parties) {

    console.log(parties)

    let div_overview = document.getElementById("party-overview")

    let col = document.createElement("div");
    col.setAttribute("class", "jumbotron");

    let card = document.createElement("div");
    card.setAttribute("class", "card");

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    let table = document.createElement("table")
    table.setAttribute("id", "table")
    let nameTh = document.createElement("th")
    nameTh.innerHTML = "Parti"
    let votesTh = document.createElement("th")
    votesTh.innerHTML = "Stemmer i %"

    table.appendChild(nameTh)
    table.appendChild(votesTh)


    for (let party of parties) {

        console.log(party)

        let tr = document.createElement("tr")
        tr.style.marginTop = '10px';

        let partyNameTd = document.createElement("td")
        let partyNameText = document.createTextNode(party.partyName);
        partyNameTd.appendChild(partyNameText);

        let votesTd = document.createElement("td")
        let candidateVotesText = document.createTextNode(convertPercentOfHole(party.partyScore, parties));
        votesTd.setAttribute("class", "votes");
        votesTd.appendChild(candidateVotesText);

        div_overview.appendChild(col);
        col.appendChild(card);
        card.appendChild(cardBody);
        cardBody.appendChild(table)
        table.appendChild(tr)
        tr.appendChild(partyNameTd)
        tr.appendChild(votesTd);

    }
}

function convertPercentOfHole(partyScore, parties) {
    let totalNumberOfVotes = 0;

    for (let party of parties) {
        totalNumberOfVotes += party.partyScore
    }
    return Math.round(partyScore / totalNumberOfVotes * 100)

}

