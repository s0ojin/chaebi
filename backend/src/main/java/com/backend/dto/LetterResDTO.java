package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class LetterResDTO {
    private long id;
    private String title;
    private long userId;
    private Set<RecipientResDTO> recipients = new HashSet<RecipientResDTO>();
}
