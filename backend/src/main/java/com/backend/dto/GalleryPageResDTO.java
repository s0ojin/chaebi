package com.backend.dto;


import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

// 페이징 정보를 포함한 응답 DTO
@Getter
public class GalleryPageResDTO {
    private List<GalleryResDTO> content;
    private int currentPage;
    private int totalPages;
    private long totalElements;
    private boolean hasNext;

    public GalleryPageResDTO(Page<GalleryResDTO> page) {
        this.content = page.getContent();
        this.currentPage = page.getNumber();
        this.totalPages = page.getTotalPages();
        this.totalElements = page.getTotalElements();
        this.hasNext = page.hasNext();
    }
}