package com.backend.dto;

import com.backend.domain.GalleryRecipient;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RecipientInfoDTO {
    private Long recipientId;
    private String recipientName;
    private String phoneNumber;



    public RecipientInfoDTO(GalleryRecipient galleryRecipient) {
        this.recipientId = galleryRecipient.getRecipient().getId();
        this.recipientName = galleryRecipient.getRecipient().getName();
        this.phoneNumber = galleryRecipient.getRecipient().getPhone();// Recipient 엔티티에 name 필드가 있다고 가정
    }
}
