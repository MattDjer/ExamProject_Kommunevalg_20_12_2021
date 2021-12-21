package com.example.examproject_kommunevalg_20_12_2021.model;

import javax.persistence.*;

@Entity
public class Candidate {

    @Id
    @GeneratedValue
    Integer candidateId;
    String candidateName;
    Integer numberOfVotes;


    @ManyToOne
    @JoinColumn(name = "partyId")
    private Party party;

    public Candidate(Integer candidateId, String name, Integer numberOfVotes) {
        this.candidateId = candidateId;
        this.candidateName = name;
        this.numberOfVotes = numberOfVotes;
    }

    public Candidate() {}

    public Integer getId() {
        return candidateId;
    }

    public void setId(Integer candidateId) {
        this.candidateId = candidateId;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String name) {
        this.candidateName = name;
    }

    public Integer getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Integer candidateId) {
        this.candidateId = candidateId;
    }

    public Integer getNumberOfVotes() {
        return numberOfVotes;
    }

    public void setNumberOfVotes(Integer numberOfVotes) {
        this.numberOfVotes = numberOfVotes;
    }

    public Party getParty() {
        return party;
    }

    public void setParty(Party party) {
        this.party = party;
    }
}

