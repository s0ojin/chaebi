package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class PresignedUrlRequest {
    private String fileName;
    private String contentType;
    private Set<Long> recipientIds;
}
