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
    private Recipient recipient;

    @Column(columnDefinition = "TEXT")
    private String content; //내용

    @Column(name = "last_modified_date")
    private LocalDateTime lastModifiedDate; //마지막 수정날짜

    @Column(name = "sort")
    private String sort;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        lastModifiedDate = LocalDateTime.now();
    }


}
