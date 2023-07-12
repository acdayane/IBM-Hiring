package com.test3.hiring.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.test3.hiring.model.Candidate;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    Optional<Candidate> findByName(String name);
    
}
