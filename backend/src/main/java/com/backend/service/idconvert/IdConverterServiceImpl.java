package com.backend.service.idconvert;

import com.backend.dto.PairDTO;
import org.springframework.stereotype.Service;

@Service
public class IdConverterServiceImpl implements IdConverterService {
    private static final int COMBINED_LENGTH = 6;
    private static final int MAX_ID_LENGTH = 3; // 각 ID는 최대 3자리

    // ID를 6자리 숫자로 변환
    public String combineIds(String userId, String recipientId) {
        // 각 ID를 3자리로 패딩
        String paddedUserId = String.format("%03d", Integer.parseInt(userId));
        String paddedRecipientId = String.format("%03d", Integer.parseInt(recipientId));

        // 두 ID를 합쳐서 6자리 생성
        return paddedUserId + paddedRecipientId;
    }

    // 6자리 숫자에서 원래 ID들을 추출
    public PairDTO extractIds(String combinedId) {
        if (combinedId.length() != COMBINED_LENGTH) {
            throw new IllegalArgumentException("Combined ID must be 6 digits");
        }

        String userId = String.valueOf(Integer.parseInt(combinedId.substring(0, 3)));
        String recipientId = String.valueOf(Integer.parseInt(combinedId.substring(3)));

        return new PairDTO(userId, recipientId);
    }
}
