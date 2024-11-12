package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class TokenRes {
    private String accessToken;
    private String refreshToken;
}
