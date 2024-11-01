package com.backend.repository;

import com.backend.domain.Letter;
import com.backend.domain.Recipient;
import com.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LetterRepository extends JpaRepository<Letter, Long> {
    List<Letter> findByUserAndRecipient(User user, Recipient recipient);
}
