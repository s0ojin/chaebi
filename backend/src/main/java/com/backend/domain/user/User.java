package com.backend.domain.user;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name= "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    private String id;
    private String password;
    private String name;
    private String phone;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    private boolean status;
    private int loginAttemptPeriod;
    private String secretQuestion;
    private String secretAnswer;
    private boolean admin;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
