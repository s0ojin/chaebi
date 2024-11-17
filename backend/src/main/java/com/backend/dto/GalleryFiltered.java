package com.backend.dto;

import com.backend.domain.Gallery;
import com.backend.domain.Keyword;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
public class GalleryFiltered {
    private Long id;
    private String fileUrl;
    private String fileType;
    private String fileName;
    private LocalDateTime createdDate;


    public GalleryFiltered(Gallery gallery) {
        this.id = gallery.getId();
        this.fileUrl = gallery.getFileUrl();
        this.fileType = gallery.getFileType();
        this.fileName = gallery.getFileName();
        this.createdDate = gallery.getCreatedDate();
    }
}
