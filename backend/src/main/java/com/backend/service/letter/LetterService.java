package com.backend.service.letter;

import com.backend.domain.Letter;
import com.backend.domain.User;

import java.util.List;

public interface LetterService { // 편지
    void createLetter(Letter letter);
    Letter getLetter(long id);
    List<Letter> getLetters(User user);
    void updateLetter(Letter letter);
    void deleteLetter(long id);
}
