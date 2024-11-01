package com.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "galleries")
@Getter
@Setter
@NoArgsConstructor
public class Gallery {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id; //고유 번호

        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user; //작성자

        @ManyToOne
        @JoinColumn(name = "recipient_id")
        private Recipient recipient; //열람자

        private String fileUrl;  // S3 URL
        private String fileType; // IMAGE or VIDEO

        @Column(name = "created_date")
        private LocalDateTime createdDate; //업로드 날짜

        @PrePersist
        protected void onCreate() {
            createdDate = LocalDateTime.now();
        }
}

