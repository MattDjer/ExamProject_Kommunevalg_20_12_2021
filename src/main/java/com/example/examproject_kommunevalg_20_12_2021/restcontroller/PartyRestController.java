package com.example.examproject_kommunevalg_20_12_2021.restcontroller;

import com.example.examproject_kommunevalg_20_12_2021.model.Party;
import com.example.examproject_kommunevalg_20_12_2021.model.PartyScore;
import com.example.examproject_kommunevalg_20_12_2021.repository.PartyRepository;
import com.example.examproject_kommunevalg_20_12_2021.repository.PartyScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@RestController
public class PartyRestController {

    @Autowired
    PartyRepository partyRepository;

    @GetMapping("/api/get-parties")
    public ResponseEntity<List<Party>> getParties() {
        return new ResponseEntity<>(partyRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/api/party-overview")
    public ResponseEntity<List<PartyScore>> getPartyScore() throws SQLException {
        List<PartyScore> partyScores = PartyScoreRepository.getPartyScore();
        return new ResponseEntity<>(partyScores, HttpStatus.OK);
    }
}
