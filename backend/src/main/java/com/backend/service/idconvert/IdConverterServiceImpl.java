package com.backend.service.idconvert;

import com.backend.dto.PairDTO;
import org.springframework.stereotype.Service;

@Service
public class IdConverterServiceImpl implements IdConverterService {
    private static final int COMBINED_LENGTH = 6;
    private static final int MAX_ID_LENGTH = 3; // 각 ID는 최대 3자리

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

        return result.toString();
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
        String userId = String.valueOf(Integer.parseInt(combinedId.substring(0, 3)));
        String recipientId = String.valueOf(Integer.parseInt(combinedId.substring(3)));

        return new PairDTO(userId, recipientId);
    }
}
