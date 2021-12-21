package com.example.examproject_kommunevalg_20_12_2021.model;

public class PartyScore {

    String partyName;
    Integer partyScore;

    public PartyScore(String partyName, Integer partyScore) {
        this.partyName = partyName;
        this.partyScore = partyScore;
    }

    public PartyScore() {}

    public String getPartyName() {
        return partyName;
    }

    public void setPartyName(String partyName) {
        this.partyName = partyName;
    }

    public Integer getPartyScore() {
        return partyScore;
    }

    public void setPartyScore(Integer partyScore) {
        this.partyScore = partyScore;
    }
}
