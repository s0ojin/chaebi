package com.backend.domain;

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

    @ManyToMany //M:N을 단순히 이렇게 처리할 지 중간다리 하나 넣을지 고민
    @JoinTable(
            name = "letter_recipients",
            joinColumns = @JoinColumn(name = "letter_id"),
            inverseJoinColumns = @JoinColumn(name = "recipient_id")
    )
    private Set<Recipient> recipient = new HashSet<>();

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
