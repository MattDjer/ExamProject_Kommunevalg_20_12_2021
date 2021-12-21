package com.example.examproject_kommunevalg_20_12_2021.repository;

import com.example.examproject_kommunevalg_20_12_2021.model.Candidate;
import com.example.examproject_kommunevalg_20_12_2021.model.PartyScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
}
