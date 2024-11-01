package com.backend.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; //작성자

    @PrePersist
    @PreUpdate
    protected void onCreate() {
        lastModifiedDate = LocalDateTime.now();
    }
}
