package com.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "letters")
@Getter
@Setter
@NoArgsConstructor
public class Letter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //고유 번호

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; //작성자

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private Recipient recipient; //열람자

    @Column(columnDefinition = "TEXT")
    private String content; //내용

    @Column(name = "last_modified_date")
    private LocalDateTime lastModifiedDate; //마지막 수정날짜

    @PrePersist
    @PreUpdate
    protected void onCreate() {
        lastModifiedDate = LocalDateTime.now();
    }
}
