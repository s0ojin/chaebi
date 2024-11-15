package com.backend.dto;

import lombok.Data;

import java.util.Set;

@Data
public class UpdateRecipientsReqDTO {
    private Set<Long> recipientIds;
}
