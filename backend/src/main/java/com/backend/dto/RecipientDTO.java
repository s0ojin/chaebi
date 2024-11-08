package com.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Schema(name = "열람자 등록 정보 DTO", description = "열람자 등록에 필요한 정보")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipientDTO {
    @NotBlank(message = "PhoneNumber is required")
    private String phone;
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Question is required")
    private String secretQuestion;
    @NotBlank(message = "Answer is required")
    private String secretAnswer;
    private String imgUrl;
}
