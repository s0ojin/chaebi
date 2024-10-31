package com.backend.service.letter;

import com.backend.domain.Letter;

import java.util.List;

public interface LetterService { // 편지
    Letter createLetter(Letter letter);
    Letter getLetter(int id);
    List<Letter> getLetters();
    void updateLetter(Letter letter);
    void deleteLetter(int id);
}
