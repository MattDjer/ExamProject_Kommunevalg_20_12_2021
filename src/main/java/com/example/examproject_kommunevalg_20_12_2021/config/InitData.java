package com.example.examproject_kommunevalg_20_12_2021.config;

import com.example.examproject_kommunevalg_20_12_2021.model.Candidate;
import com.example.examproject_kommunevalg_20_12_2021.model.Party;
import com.example.examproject_kommunevalg_20_12_2021.model.User;
import com.example.examproject_kommunevalg_20_12_2021.repository.CandidateRepository;
import com.example.examproject_kommunevalg_20_12_2021.repository.PartyRepository;

import com.example.examproject_kommunevalg_20_12_2021.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@Component
public class InitData implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PartyRepository partyRepository;

    @Autowired
    CandidateRepository candidateRepository;

    @Override
    public void run(String... args) throws Exception {

        // Socialdemokratiet
        Candidate candidate = new Candidate(1, "Helle Hansen", 500);
        candidateRepository.save(candidate);

        Candidate candidate2 = new Candidate(2, "Michael Bo", 450);
        candidateRepository.save(candidate2);

        Set<Candidate> socialDemokratietSet = new HashSet<>();
        socialDemokratietSet.add(candidate);
        socialDemokratietSet.add(candidate2);

        Party party = new Party(1, "Socialdemokratiet");
        party.setCandidates(socialDemokratietSet);
        partyRepository.save(party);

/*
        // Det konservative Folkeparti
        Candidate candidate3 = new Candidate(3, "Per Urban Olsen", 500);
        candidateRepository.save(candidate3);

        Candidate candidate4 = new Candidate(4, "Louise Bramstorp", 0);
        candidateRepository.save(candidate4);

        Set<Candidate> konservativeSet = new HashSet<>();
        konservativeSet.add(candidate3);
        konservativeSet.add(candidate4);

        Party konservative = new Party(2, "Konservative");
        konservative.setCandidates(konservativeSet);
        partyRepository.save(konservative);

        // SF
        Candidate candidate5 = new Candidate(5, "Ulla Holm", 0);
        candidateRepository.save(candidate5);

        Candidate candidate6 = new Candidate(6, "Anne Grethe Olsen", 0);
        candidateRepository.save(candidate6);

        Set<Candidate> socialistiskFolkepartiSet = new HashSet<>();
        socialistiskFolkepartiSet.add(candidate5);
        socialistiskFolkepartiSet.add(candidate6);

        Party party3 = new Party(3, "SF");
        party3.setCandidates(socialistiskFolkepartiSet);
        partyRepository.save(party3);

*/


    }

}

