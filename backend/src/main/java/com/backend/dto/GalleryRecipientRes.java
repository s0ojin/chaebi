package com.backend.dto;

import com.backend.domain.Gallery;
import com.backend.domain.Keyword;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;
@Data
@AllArgsConstructor
public class GalleryRecipientRes {
    private Long id;
    private String fileUrl;
    private String fileType;
    private String fileName;
    private LocalDateTime createdDate;
    private Set<RecipientInfoDTO> recipients;
    private Set<Keyword> keywords;
    private String locate;
    private LocalDateTime date;

    public GalleryRecipientRes(Gallery gallery) {
        this.id = gallery.getId();
        this.fileUrl = gallery.getFileUrl();
        this.fileType = gallery.getFileType();
        this.fileName = gallery.getFileName();
        this.createdDate = gallery.getCreatedDate();
        this.recipients = gallery.getGalleryRecipients().stream()
                .map(RecipientInfoDTO::new)
                .collect(Collectors.toSet());
        this.keywords = gallery.getKeywords();
        this.locate = gallery.getLocate();
        this.date = gallery.getCapturedDate();
    }
}
