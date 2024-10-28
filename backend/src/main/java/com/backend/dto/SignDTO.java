package com.backend.dto;

import lombok.Data;

@Data
public class SignDTO {
    private String id;
    private String password;
    private String name;
    private String phone;
    private String email;
    private String secretQuestion;
    private String secretAnswer;
}
