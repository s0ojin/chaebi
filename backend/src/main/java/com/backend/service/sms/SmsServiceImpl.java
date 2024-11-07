package com.backend.service.sms;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Transactional
@RequiredArgsConstructor
public class SmsServiceImpl implements SmsService {
    @Override
    public boolean isObituaryMessage(String body) {
        // 예시: "부고", "소천", "고인", "작고" 등 부고와 관련된 키워드 판별
        String[] obituaryKeywords = {"부고", "소천", "작고", "고인"};
        for (String keyword : obituaryKeywords) {
            if (body.contains(keyword)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public String extractDeceasedName(String body) {
        // 예시 정규식으로 이름 추출
        String namePattern = "고 (\\S+)";
        Pattern pattern = Pattern.compile(namePattern);
        Matcher matcher = pattern.matcher(body);
        if (matcher.find()) {
            return matcher.group(1); // 이름 부분 추출
        }
        return "알 수 없는 이름"; // 추출 실패 시 기본 메시지
    }
}

