package com.backend.service.recipient;

import com.backend.domain.Recipient;
import com.backend.domain.User;
import com.backend.dto.RecipientDTO;
import com.backend.exception.AlreadyExistsException;
import com.backend.repository.RecipientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecipientServiceImpl implements RecipientService{ //열람인 CRUD 구현

    private final RecipientRepository repository;

    @Override
    public Recipient createRecipient(RecipientDTO recipientDTO, User user) {
        if(repository.findByUserAndPhone(user, recipientDTO.getPhone()) != null){
            throw new AlreadyExistsException(recipientDTO.getName() +  "님은 이미 등록되었습니다.");
        }
        Recipient recipient = Recipient.builder()
                .phone(recipientDTO.getPhone())
                .name(recipientDTO.getName())
                .securityQuestion(recipientDTO.getSecretQuestion())
                .securityAnswer(recipientDTO.getSecretAnswer())
                .user(user)
                .build();

        return repository.save(recipient); //열람자 저장
    }

    @Override
    public Recipient getRecipient(long id) {
        return repository.findById(id)  //열람자 검색
                .orElseThrow(() -> new NoSuchElementException("No entity found with id: " + id));
    }

    @Override
    public Optional<List<Recipient>> getRecipients(Optional<User> user) {  //사용자의 열람자 리스트 반환 
        List<Recipient> recipients = repository.findByUser(user.get());
        if (recipients.isEmpty()) {
            return Optional.empty(); // 결과가 없을 경우 빈 Optional 반환
        }
        return Optional.of(recipients);
    }

    @Override
    public void updateRecipient(RecipientDTO recipientDTO, User user) { // 열람자 업데이트
        Recipient recipient = Recipient.builder()
                .phone(recipientDTO.getPhone())
                .name(recipientDTO.getName())
                .securityQuestion(recipientDTO.getSecretQuestion())
                .securityAnswer(recipientDTO.getSecretAnswer())
                .user(user)
                .build();
        repository.save(recipient);
    }

    @Override
    public void deleteRecipient(long id) {  //열람자 삭제
        repository.deleteById(id);
    }
}
