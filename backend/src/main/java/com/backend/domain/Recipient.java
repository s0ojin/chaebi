package com.backend.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "recipients")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Recipient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone; //전화번호
    private String name; //이름

    private String securityQuestion; //질문
    private String securityAnswer; //답

    @Column(name = "last_modified_date")
    private LocalDateTime lastModifiedDate; //마지막 수정날짜

    @OneToOne(mappedBy = "recipient", cascade = CascadeType.ALL, orphanRemoval = true)
    private Letter letter;  // 편지와의 관계를 @OneToOne으로 설정

    @OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<GalleryRecipient> galleryRecipients = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; //작성자

    @Column(columnDefinition = "TEXT")
    private String imgurl;

    @PrePersist
    @PreUpdate
    protected void onCreate() {
        lastModifiedDate = LocalDateTime.now();
    }

    public void addGalleryRecipient(GalleryRecipient galleryRecipient) {
        galleryRecipients.add(galleryRecipient);
        galleryRecipient.setRecipient(this);
    }

    public void removeGalleryRecipient(GalleryRecipient galleryRecipient) {
        galleryRecipients.remove(galleryRecipient);
        galleryRecipient.setRecipient(null);
    }

    // GalleryRecipients setter 수정
    public void setGalleryRecipients(Set<GalleryRecipient> galleryRecipients) {
        // 기존 관계 모두 제거
        this.galleryRecipients.forEach(gr -> gr.setRecipient(null));
        this.galleryRecipients.clear();

        // 새로운 관계 설정
        if (galleryRecipients != null) {
            galleryRecipients.forEach(gr -> {
                gr.setRecipient(this);
                this.galleryRecipients.add(gr);
            });
        }
    }

    // 편지 추가 및 삭제 메서드
    public void setLetter(Letter letter) {
        this.letter = letter;
        if (letter != null) {
            letter.setRecipient(this);
        }
    }
}
