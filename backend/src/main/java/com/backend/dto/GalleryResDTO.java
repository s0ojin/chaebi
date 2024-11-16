package com.backend.dto;

import com.backend.domain.Gallery;
import com.backend.domain.GalleryRecipient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GalleryResDTO {
    private Long id;
    private String fileUrl;
    private String fileType;
    private String fileName;
    private LocalDateTime createdDate;
    private Set<RecipientInfoDTO> recipients;

    public GalleryResDTO(Gallery gallery) {
        this.id = gallery.getId();
        this.fileUrl = gallery.getFileUrl();
        this.fileType = gallery.getFileType();
        this.fileName = gallery.getFileName();
        this.createdDate = gallery.getCreatedDate();
        this.recipients = gallery.getGalleryRecipients().stream()
                .map(RecipientInfoDTO::new)
                .collect(Collectors.toSet());
    }
}
