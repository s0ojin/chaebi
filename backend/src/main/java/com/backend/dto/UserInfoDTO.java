package com.backend.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserInfoDTO {
    private Long userId;
    private String userName;
    private String phoneNumber;
}
