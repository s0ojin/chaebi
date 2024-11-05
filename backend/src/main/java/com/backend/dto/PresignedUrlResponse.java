package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PresignedUrlResponse {
    private String presignedUrl;
    private Long galleryId;
    private String fileUrl;
}
