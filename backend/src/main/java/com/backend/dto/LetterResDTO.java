package com.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class LetterResDTO {
    private long id;
    private String content;
    private long userId;
    private RecipientResDTO recipient;
    private LocalDateTime lastModifiedDate;
    private String sort;
}
