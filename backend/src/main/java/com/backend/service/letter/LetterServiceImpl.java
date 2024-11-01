package com.backend.service.letter;

import com.backend.domain.Letter;
import com.backend.domain.User;
import com.backend.repository.LetterRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class LetterServiceImpl implements LetterService {

    private final LetterRepository repository;

    @Override
    public void createLetter(Letter letter) {
        repository.save(letter);
    }

    @Override
    public Letter getLetter(long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("Not Exists"));
    }

    @Override
    public List<Letter> getLetters(User user) {
        return repository.findByUser(user);
    }

    @Override
    public void updateLetter(Letter letter) {
        repository.save(letter);
    }

    @Override
    public void deleteLetter(long id) {
        repository.deleteById(id);
    }
}
