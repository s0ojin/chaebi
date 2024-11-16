package com.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "gallery_recipients")
@Getter
@Setter
@NoArgsConstructor
public class GalleryRecipient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "gallery_id")
    @JsonBackReference
    private Gallery gallery;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    @JsonBackReference
    private Recipient recipient;

    @Column(name = "read_status")
    private boolean readStatus = false;

    @Column(name = "first_viewed_date")
    private LocalDateTime firstViewedDate;

    @Column(name = "granted_date")
    private LocalDateTime grantedDate;

    public GalleryRecipient(Gallery gallery, Recipient recipient) {
        this.gallery = gallery;
        this.recipient = recipient;
        this.grantedDate = LocalDateTime.now();
    }

    public void markAsRead() {
        if (!this.readStatus) {
            this.readStatus = true;
            this.firstViewedDate = LocalDateTime.now();
        }
    }

    public void setRecipient(Recipient recipient) {
        // 기존 관계 제거
        if (this.recipient != null && this.recipient != recipient) {
            this.recipient.getGalleryRecipients().remove(this);
        }

        this.recipient = recipient;

        // 새로운 관계 설정
        if (recipient != null && !recipient.getGalleryRecipients().contains(this)) {
            recipient.getGalleryRecipients().add(this);
        }
    }
}

