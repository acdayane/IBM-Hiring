package com.test3.hiring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test3.hiring.dto.CandidateDTO;
import com.test3.hiring.dto.IdDTO;
import com.test3.hiring.model.Candidate;
import com.test3.hiring.service.CandidateService;

@RestController
@RequestMapping("/api/v1/hiring")
@CrossOrigin(origins = "http://localhost:3000")
public class CandidateController {

    @Autowired
    private CandidateService service;
    
    @PostMapping("/start")
    public ResponseEntity<String> startProcess(@RequestBody CandidateDTO data) {
        try {
            Long id = service.startProcess(data);
            return ResponseEntity.status(HttpStatus.CREATED).body("Candidato registrado com sucesso. ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro: " + e.getMessage());
        }
    }

    @PostMapping("/schedule")
    public ResponseEntity<String> scheduleInterview(@RequestBody IdDTO id) {
        try {
            service.scheduleInterview(id);
            return ResponseEntity.status(HttpStatus.OK).body("Entrevista marcada para o candidato.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro: " + e.getMessage());
        }
    }

    @PostMapping("/disqualify")
    public ResponseEntity<String> disqualifyCandidate(@RequestBody IdDTO id) {
        try {
            service.disqualifyCandidate(id);
            return ResponseEntity.status(HttpStatus.OK).body("Candidato desqualificado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro: " + e.getMessage());
        }
    }

    @PostMapping("/approve")
    public ResponseEntity<String> approveCandidate(@RequestBody IdDTO id) {
        try {
            service.approveCandidate(id);
            return ResponseEntity.status(HttpStatus.OK).body("Candidato aprovado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro: " + e.getMessage());
        }
    }

    @GetMapping("/candidate/{id}")
    public ResponseEntity<String> getStatus(@PathVariable Long id) {
        try {
            String status = service.getStatus(id);
            return ResponseEntity.status(HttpStatus.OK).body("Status do candidato: " + status);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro: " + e.getMessage());
        }   
    }

    @GetMapping("/approved")
    public ResponseEntity<List<Candidate>> getAllApproved() {
        try {
            List<Candidate> allApproved = service.getAllApproved();
            return ResponseEntity.ok(allApproved);
  
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }        
    } 

    @GetMapping("/allcandidates")
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        try {
            List<Candidate> allCandidates = service.getAllCandidates();
            return ResponseEntity.ok(allCandidates);
  
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }        
    } 

}
