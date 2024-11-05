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

    @OneToMany(mappedBy = "letter", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<LetterRecipient> letterRecipients = new HashSet<>();

    @Column(columnDefinition = "TEXT")
    private String content; //내용

    @Column(name = "last_modified_date")
    private LocalDateTime lastModifiedDate; //마지막 수정날짜

    @Column(name = "last_modified_date")
    private boolean sort;

    @PrePersist
    @PreUpdate
    protected void onCreate() {
        lastModifiedDate = LocalDateTime.now();
    }

    // 수신자 추가 메서드
    public void addRecipient(Recipient recipient) {
        LetterRecipient letterRecipient = new LetterRecipient(this, recipient);
        letterRecipients.add(letterRecipient);
    }

    // 수신자 제거 메서드
    public void removeRecipient(Recipient recipient) {
        letterRecipients.removeIf(lr -> lr.getRecipient().equals(recipient));
    }
}
