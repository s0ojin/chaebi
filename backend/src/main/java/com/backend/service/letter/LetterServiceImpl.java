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

        // 수신자 추가
        if (letterDTO.getRecipientIds() != null) {
            for (Long recipientId : letterDTO.getRecipientIds()) {
                Recipient recipient = recipientRepository.findById(recipientId)
                        .orElseThrow(() -> new EntityNotFoundException("Recipient not found"));
                letter.addRecipient(recipient);
            }
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

        // 수신자 목록 업데이트 (있는 경우)
        if (letterDTO.getRecipientIds() != null) {
            updateRecipients(letter.getId(), letterDTO.getRecipientIds());
        }

        Letter updatedLetter = repository.save(letter);
    }


    public void updateRecipients(Long letterId, Set<Long> newRecipientIds) { //편지에 대한 수신인 병경
        Letter letter = repository.findById(letterId) //편지를 조회
                .orElseThrow(() -> new EntityNotFoundException("Letter not found"));

        // 현재 수신자 ID 목록
        Set<Long> currentRecipientIds = letter.getLetterRecipients().stream()
                .map(lr -> lr.getRecipient().getId())
                .collect(Collectors.toSet()); // 현재의 수신인을 가져옴

        // 새로 추가할 수신자 처리
        for (Long recipientId : newRecipientIds) {
            if (!currentRecipientIds.contains(recipientId)) {
                Recipient recipient = recipientRepository.findById(recipientId)
                        .orElseThrow(() -> new EntityNotFoundException("Recipient not found"));
                letter.addRecipient(recipient);
            }
        }

        // 제거할 수신자 처리
        letter.getLetterRecipients().removeIf(lr ->
                !newRecipientIds.contains(lr.getRecipient().getId()));

        repository.save(letter);
    }

    @Override
    public void deleteLetter(long id) {
        repository.deleteById(id);
    }

    public LetterResDTO convertToDTO(Letter letter) {
        LetterResDTO dto = new LetterResDTO();
        dto.setId(letter.getId());
        dto.setUserId(letter.getUser().getId());
        dto.setTitle(letter.getContent()); // 또는 필요한 다른 필드
        dto.setSort(letter.isSort());
        dto.setLastModifiedDate(letter.getLastModifiedDate());
        // 수신자 id, 이름, 전화번호만 Set에 담기
        Set<RecipientResDTO> recipientDTO = letter.getLetterRecipients().stream()
                .map(lr -> new RecipientResDTO(
                        lr.getRecipient().getId(),
                        lr.getRecipient().getName(),
                        lr.getRecipient().getPhone()
                ))
                .collect(Collectors.toSet());
        dto.setRecipients(recipientDTO);
        return dto;
    }
}
