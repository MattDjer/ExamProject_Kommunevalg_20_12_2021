package com.example.examproject_kommunevalg_20_12_2021.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Party {

    @Id
    @GeneratedValue
    Integer partyId;
    String name;

    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "partyId")
    private Set<Candidate> candidates;

    public Party(Integer partyId, String name) {
        this.partyId = partyId;
        this.name = name;
    }

    public Party(){}

    public Integer getPartyId() {
        return partyId;
    }

    public void setPartyId(Integer partyId) {
        this.partyId = partyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String partyName) {
        this.name = partyName;
    }

    public Set<Candidate> getCandidates() {
        return candidates;
    }

    public void setCandidates(Set<Candidate> candidateSet) {
        this.candidates = candidateSet;
    }
}
