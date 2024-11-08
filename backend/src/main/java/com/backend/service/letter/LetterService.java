package com.backend.service.letter;

import com.backend.domain.Letter;
import com.backend.domain.Recipient;
import com.backend.domain.User;
import com.backend.dto.LetterDTO;
import com.backend.dto.LetterResDTO;

import java.util.List;
import java.util.Set;

public interface LetterService { // 편지
    void createLetter(User user, Recipient recipient);
    LetterResDTO getLetter(long id);
    List<LetterResDTO> getLetters(User user);
    void updateLetter(Long letterId, LetterDTO letterDTO, User user);
    void deleteLetter(long id);
    LetterResDTO convertToDTO(Letter letter);
}
