package com.test3.hiring.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CandidateDTO(

    @NotBlank(message = "Name cannot be null")
    @Size(min = 3, max = 200, message = "Name must be between 10 and 200 characters")
    @Pattern( regexp = "^(([a-zA-Z ]|[é])*)$", message = "Name is not valid")
    String name
    
    ) {
    
}