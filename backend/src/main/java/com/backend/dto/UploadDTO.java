package com.backend.dto;

import com.backend.domain.Recipient;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@Data
@RequiredArgsConstructor
public class UploadDTO {
    //private String fileName;
    private Set<Long> recipientIds;
    private List<String> location; //위치정보(객체로 할 시 너무 복잡해져서 URL 에러 생김
    private List<String> capturedTime; // 사진 찍힌 순간
}
