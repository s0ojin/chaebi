package com.backend.dto;

import com.backend.domain.Recipient;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@Data
@RequiredArgsConstructor
public class UploadDTO {
    //private String fileName;
    private Set<Long> recipientIds;
}
