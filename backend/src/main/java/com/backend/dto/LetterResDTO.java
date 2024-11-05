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
    private String title;
    private long userId;
    private Set<RecipientResDTO> recipients = new HashSet<RecipientResDTO>();
    private LocalDateTime lastModifiedDate;
    private boolean sort;
}
