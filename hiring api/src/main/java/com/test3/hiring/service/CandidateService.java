package com.test3.hiring.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.test3.hiring.dto.CandidateDTO;
import com.test3.hiring.dto.IdDTO;
import com.test3.hiring.exception.NotFoundException;
import com.test3.hiring.model.Candidate;
import com.test3.hiring.repository.CandidateRepository;

import jakarta.validation.Valid;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository repository;

    public Long startProcess(@Valid CandidateDTO data) {
        Optional<Candidate> nameExist = repository.findByName(data.name());
        if (nameExist.isEmpty() == false)
            throw new NotFoundException("Candidato já participa do processo");

        Candidate candidate = new Candidate(data.name(), "Recebido");
        repository.save(candidate);

        Long id = candidate.getId();
        return id;
    }

    public void scheduleInterview(@Valid IdDTO data) {
        Candidate candidate = repository.findById(data.id()).orElseThrow(() -> {
            throw new NotFoundException("Candidato não encontrado");
        });
        candidate.setStatus("Qualificado");
        repository.save(candidate);
        return;
    }

    public void disqualifyCandidate(@Valid IdDTO data) {
        Candidate candidate = repository.findById(data.id()).orElseThrow(() -> {
            throw new NotFoundException("Candidato não encontrado");
        });
        candidate.setStatus("Desqualificado");
        repository.save(candidate);
        return;
    }

    public void approveCandidate(@Valid IdDTO data) {
        Candidate candidate = repository.findById(data.id()).orElseThrow(() -> {
            throw new NotFoundException("Candidato não encontrado");
        });
        candidate.setStatus("Aprovado");
        repository.save(candidate);
        return;
    }

    public String getStatus(@PathVariable @Valid Long id) {
        Candidate candidate = repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Candidato não encontrado");
        });
        String status = candidate.getStatus();
        return status;
    }

    public List<Candidate> getAllApproved() {
        List<Candidate> candidatesList = repository.findAll();

        List<Candidate> approvedCandidates = new ArrayList<>();
        for (Candidate candidate : candidatesList) {
            if ("aprovado".equalsIgnoreCase(candidate.getStatus())) {
                approvedCandidates.add(candidate);
            }
        }

        return approvedCandidates;
    }

}
