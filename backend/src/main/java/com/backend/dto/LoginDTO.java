package com.backend.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String phone;
    private String password;
    private boolean cert;
}
