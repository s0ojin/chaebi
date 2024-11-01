package com.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignDTO {
    @NotBlank(message = "PhoneNumber is required")
    private String phone;
    @NotBlank(message = "Password is required")
    private String password;
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Question is required")
    private String secretQuestion;
    @NotBlank(message = "Answer is required")
    private String secretAnswer;
}
