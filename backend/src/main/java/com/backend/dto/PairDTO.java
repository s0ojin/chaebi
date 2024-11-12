package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PairDTO {
    private Long userId;
    private Long recipientId;
}