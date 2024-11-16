package com.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnterRecipient {
    private Long id;
    private String name;
    private String phone;
    private String secretQuestion;
    private String secretAnswer;
}
