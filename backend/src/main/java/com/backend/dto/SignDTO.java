package com.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignDTO {
    @NotBlank(message = "PhoneNumber is required")
    private String phone;
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "fcmToken is required")
    private String fcmToken;
    @NotBlank(message = "push is required")
    private boolean push;
}
