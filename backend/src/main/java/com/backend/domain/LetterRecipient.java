package com.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "letter_recipients")
@Getter
@Setter
@NoArgsConstructor
public class LetterRecipient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "letter_id")
    @JsonBackReference
    private Letter letter;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    @JsonBackReference
    private Recipient recipient;

    @Column(name = "read_status")
    private boolean readStatus = false;

    @Column(name = "received_date")
    private LocalDateTime receivedDate;

    public LetterRecipient(Letter letter, Recipient recipient) {
        this.letter = letter;
        this.recipient = recipient;
        this.receivedDate = LocalDateTime.now();
    }
}

