package com.backend.service.letter;

import com.backend.domain.Letter;
import com.backend.domain.Recipient;
import com.backend.domain.User;
import com.backend.dto.LetterDTO;
import com.backend.dto.LetterResDTO;
import com.backend.dto.RecipientResDTO;
import com.backend.exception.UnauthorizedException;
import com.backend.repository.LetterRepository;
import com.backend.repository.RecipientRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class LetterServiceImpl implements LetterService {

    private final LetterRepository repository;
    private final RecipientRepository recipientRepository;

    @Override
    public void createLetter(User user, LetterDTO letterDTO) {
        Letter letter = new Letter();
        letter.setUser(user);
        letter.setContent(letterDTO.getContent());
        letter.setSort(letterDTO.isSort());
        if (letterDTO.getRecipientId() != null) {
            Recipient recipient = recipientRepository.findById(letterDTO.getRecipientId())
                    .orElseThrow(() -> new EntityNotFoundException("Recipient not found"));
            letter.setRecipient(recipient);
        }

        repository.save(letter);
    }

    @Override
    public LetterResDTO getLetter(long id) {
        Letter letter = repository.findById(id).orElseThrow(() -> new NoSuchElementException("Not Exists"));
        return this.convertToDTO(letter);
    }

    @Override
    public List<LetterResDTO> getLetters(User user) {
        List<Letter> letters = repository.findByUser(user);
        return letters.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void updateLetter(Long letterId, LetterDTO letterDTO, User user) {
        Letter letter = repository.findById(letterId)
                .orElseThrow(() -> new EntityNotFoundException("Letter not found"));

        // 작성자 확인
        if (!letter.getUser().getPhone().equals(user.getPhone())) {
            throw new UnauthorizedException("You don't have permission to update this letter");
        }

        // 내용 업데이트
        if (letterDTO.getContent() != null) {
            letter.setContent(letterDTO.getContent());
        }

        letterDTO.setSort(letterDTO.isSort());

        Letter updatedLetter = repository.save(letter);
    }


    @Override
    public void deleteLetter(long id) {
        repository.deleteById(id);
    }

    public LetterResDTO convertToDTO(Letter letter) {
        LetterResDTO dto = new LetterResDTO();
        dto.setId(letter.getId());
        dto.setUserId(letter.getUser().getId());
        dto.setContent(letter.getContent()); // 또는 필요한 다른 필드
        dto.setSort(letter.isSort());
        dto.setLastModifiedDate(letter.getLastModifiedDate());
        // 수신자 id, 이름, 전화번호만 resDTO에 담기
        RecipientResDTO recipientDTO = new RecipientResDTO(letter.getRecipient().getId(),
                letter.getRecipient().getName(),
                letter.getRecipient().getPhone(),
                letter.getRecipient().getImgurl()
                );

        dto.setRecipient(recipientDTO);
        return dto;
    }
}
