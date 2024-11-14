package com.backend.dto;

import lombok.Builder;
import lombok.Data;
@Builder
@Data
public class EnterRes {
    private UserInfoDTO userInfo;
    private EnterRecipient enterRecipient;
}
