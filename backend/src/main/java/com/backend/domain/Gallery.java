package com.backend.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "galleries")
@Getter
@Setter
@NoArgsConstructor
public class Gallery {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;

        @OneToMany(mappedBy = "gallery", cascade = CascadeType.ALL, orphanRemoval = true)
        @JsonManagedReference
        private Set<GalleryRecipient> galleryRecipients = new HashSet<>();

        private String fileUrl;
        private String fileType;
        private String fileName;

        @Column(name = "created_date")
        private LocalDateTime createdDate;

        @PrePersist
        protected void onCreate() {
                createdDate = LocalDateTime.now();
        }

        public void addRecipient(Recipient recipient) {
                GalleryRecipient galleryRecipient = new GalleryRecipient(this, recipient);
                galleryRecipients.add(galleryRecipient);
        }

        public void removeRecipient(Recipient recipient) {
                galleryRecipients.removeIf(gr -> gr.getRecipient().equals(recipient));
        }

        public void clearRecipients() {
                galleryRecipients.clear();
        }
}