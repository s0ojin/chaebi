package com.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipientResDTO {
    private Long id;
    private String name;
    private String phone;
    private String imgUrl;
    private String secretQuestion;
    private String secretAnswer;
    private LocalDateTime lastModified;
}
