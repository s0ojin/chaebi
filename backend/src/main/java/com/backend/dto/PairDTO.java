package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PairDTO {
    private String userId;
    private String recipientId;
}