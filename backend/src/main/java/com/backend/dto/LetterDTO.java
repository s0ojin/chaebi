package com.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Data
public class LetterDTO {
    @NotBlank(message = "content is required")
    private String content;
    @NotBlank(message = "recipient id is required")
    private Set<Long> recipientIds; // 수신자 ID 목록
    @NotBlank(message = "sort is required")
    private boolean sort;
}
