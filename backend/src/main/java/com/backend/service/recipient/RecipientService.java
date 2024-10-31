package com.backend.service.recipient;

import com.backend.domain.Recipient;
import com.backend.domain.User;

import java.util.List;
import java.util.Optional;

public interface RecipientService {
    Recipient createRecipient(Recipient recipient); //열람인 생성
    Recipient getRecipient(long id); // 열람인 조회
    Optional<List<Recipient>> getRecipients(Optional<User> user); // 그 유저의 열람인들 불러오기
    void updateRecipient(Recipient recipient);
    void deleteRecipient(long recipient);
}
