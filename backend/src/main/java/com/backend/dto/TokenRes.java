package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenRes {
    private String name;
    private String phoneNumber;
    private String accessToken;
    private String refreshToken;
}
