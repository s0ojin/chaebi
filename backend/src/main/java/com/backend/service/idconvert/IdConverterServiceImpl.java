package com.backend.service.idconvert;

import com.backend.domain.Recipient;
import com.backend.dto.PairDTO;
import com.backend.repository.RecipientRepository;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
@Transactional
@RequiredArgsConstructor
public class IdConverterServiceImpl implements IdConverterService {
    private static final int COMBINED_LENGTH = 6;
    private static final int MAX_ID_LENGTH = 3; // 각 ID는 최대 3자리
    private final RecipientRepository recipientRepository;

    //난수로 코드 생성
    public String generateRandomCode(Long recipientId) {
        // 숫자와 알파벳을 결합한 코드 생성
        String characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        SecureRandom random = new SecureRandom();

        StringBuilder result = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(characters.length());
            result.append(characters.charAt(index));
        }

        String resultCode = result.toString();

        // 예시로 생성된 코드와 매핑할 열람자를 찾아 설정 및 저장
        Recipient recipient = recipientRepository.findById(recipientId).orElse(null);
        if (recipient != null) {
            recipient.setEnterCode(resultCode);
            recipientRepository.save(recipient);
        }

        return resultCode;
    }

    //유저아이디와 열람자아이디로 코드 생성
    public String combineIds(Long userId, Long recipientId) {
        // 각 ID를 3자리로 패딩
        String paddedUserId = String.format("%03d", userId);
        String paddedRecipientId = String.format("%03d", recipientId);

        // 두 ID를 합쳐서 6자리 숫자 생성
        String combinedId = paddedUserId + paddedRecipientId;


        StringBuilder result = new StringBuilder();
        for (int i = 0; i < combinedId.length(); i++) {
            int num = Character.getNumericValue(combinedId.charAt(i));
            if (i % 2 == 0) {
                result.append(num);
            } else {
                result.append((char) ('A' + num));
            }
        }
        String resultCode = result.toString();
        Recipient recipient = recipientRepository.findById(recipientId).orElse(null);
        recipient.setEnterCode(resultCode);
        recipientRepository.save(recipient); // 입장 코드 생성 후 저장
        return resultCode;
    }

    // 변환된 코드에서 원래 ID들을 추출
    public PairDTO extractIds(String mixedCode) {
        if (mixedCode.length() != COMBINED_LENGTH) {
            throw new IllegalArgumentException("Mixed code must be 6 characters");
        }

        StringBuilder originalNumber = new StringBuilder();
        for (int i = 0; i < mixedCode.length(); i++) {
            char c = mixedCode.charAt(i);
            if (i % 2 == 0) {

                originalNumber.append(c);
            } else {

                int num = c - 'A';
                originalNumber.append(num);
            }
        }

        String combinedId = originalNumber.toString();
        Long userId = Long.parseLong(String.valueOf(Integer.parseInt(combinedId.substring(0, 3))));
        Long recipientId = Long.parseLong(String.valueOf(Integer.parseInt(combinedId.substring(3))));

        return new PairDTO(userId, recipientId);
    }
}
