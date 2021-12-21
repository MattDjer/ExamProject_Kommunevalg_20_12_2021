package com.example.examproject_kommunevalg_20_12_2021.repository;

import com.example.examproject_kommunevalg_20_12_2021.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByNameAndPassword(String username, String password);
}
