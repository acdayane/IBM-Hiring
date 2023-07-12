package com.test3.hiring.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Name cannot be null")
    @Size(min = 3, max = 200, message = "Name must be between 10 and 200 characters")
    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "status")
    private String status;

    public Candidate (String name, String status) {
        this.name = name;
        this.status = status;
    }

}
