package com.example.examproject_kommunevalg_20_12_2021.restcontroller;

import com.example.examproject_kommunevalg_20_12_2021.model.Candidate;
import com.example.examproject_kommunevalg_20_12_2021.model.Party;
import com.example.examproject_kommunevalg_20_12_2021.model.PartyScore;
import com.example.examproject_kommunevalg_20_12_2021.repository.CandidateRepository;
import com.example.examproject_kommunevalg_20_12_2021.repository.PartyRepository;
import com.example.examproject_kommunevalg_20_12_2021.repository.PartyScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class CandidateRestController {

    @Autowired
    CandidateRepository candidateRepository;

    @Autowired
    PartyRepository partyRepository;

    @GetMapping("/api/get-party-members/{id}")
    public ResponseEntity<Set<Candidate>> getMembers(@PathVariable Integer id) {
        Optional<Party> party = partyRepository.findById(id);
        if (party.isPresent()) {
            return new ResponseEntity<>(party.get().getCandidates(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN); }
    }

    @PostMapping(value = "/api/save-candidate", consumes = "application/json")
    public ResponseEntity<Candidate> saveCandidate(@RequestBody Candidate candidate) {

        Optional<Party> party = partyRepository.findById(candidate.getParty().getPartyId());
        if (party.isPresent()) {
            candidateRepository.save(candidate);
            partyRepository.save(party.get());
            return new ResponseEntity<>(null, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/api/find-candidate/{id}")
    public ResponseEntity<Candidate> getCandidate(@PathVariable("id") Integer id) {
        Optional<Candidate> candidateOptional = candidateRepository.findById(id);

        if (!candidateOptional.isPresent()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(candidateOptional.get(), HttpStatus.OK);
    }

    @DeleteMapping("/api/delete-candidate/{id}")
    public ResponseEntity<Integer> deleteCandidate(@PathVariable("id") Integer id) {
        candidateRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PostMapping(value = "/api/save-candidate-changes", consumes = "application/json")
    public ResponseEntity<Candidate> editCandidate(@RequestBody Candidate candidate) {

        Optional<Party> party = partyRepository.findById(candidate.getParty().getPartyId());
        if (party.isPresent()) {
            candidateRepository.save(candidate);
            partyRepository.save(party.get());
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
        else { return new ResponseEntity<>(null, HttpStatus.FORBIDDEN); }
    }

    @GetMapping("/api/candidate-overview")
    public ResponseEntity<List<Candidate>> getCandidates() {
        return new ResponseEntity<>(candidateRepository.findAll(), HttpStatus.OK);
    }

    }



