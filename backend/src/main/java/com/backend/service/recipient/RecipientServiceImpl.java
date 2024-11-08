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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipientServiceImpl implements RecipientService{ //열람인 CRUD 구현

    private final RecipientRepository repository;

    @Override
    public String createRecipient(RecipientDTO recipientDTO, User user) {
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
        repository.save(recipient); //열람자 저장

        return "success";
    }

    @Override
    public RecipientDTO getRecipient(long id) {
        Recipient recipient = repository.findById(id).orElseThrow(NoSuchElementException::new);
        RecipientDTO recipientDTO = RecipientDTO.builder()
                .name(recipient.getName())
                .imgUrl(recipient.getImgurl())
                .secretQuestion(recipient.getSecurityQuestion())
                .secretAnswer(recipient.getSecurityAnswer())
                .build();
        return recipientDTO;
    }

    @Override
    public Optional<List<RecipientDTO>> getRecipients(Optional<User> user) {
        // 사용자 열람자 리스트 조회
        List<Recipient> recipients = repository.findByUser(user.orElseThrow(() -> new IllegalArgumentException("User not found")));

        // 결과가 없을 경우 빈 Optional 반환
        if (recipients.isEmpty()) {
            return Optional.empty();
        }

        // Recipient 엔티티 리스트를 RecipientDTO 리스트로 변환
        List<RecipientDTO> recipientDTOs = recipients.stream()
                .map(recipient -> RecipientDTO.builder()
                        .phone(recipient.getPhone())  // 전화번호
                        .name(recipient.getName())    // 이름
                        .secretQuestion(recipient.getSecurityQuestion()) // 비밀 질문
                        .secretAnswer(recipient.getSecurityAnswer())     // 비밀 답변
                        .imgUrl(recipient.getImgurl())  // 이미지 URL
                        .build())
                .collect(Collectors.toList());

        return Optional.of(recipientDTOs); // DTO 리스트 반환
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
