package com.backend.service.sms;

import com.backend.dto.CertReqDTO;
import com.backend.util.SmsCertificationUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Transactional
@RequiredArgsConstructor
public class SmsServiceImpl implements SmsService {

    private final SmsCertificationUtil smsCertificationUtil;
    private final RedisTemplate<String, String> redisTemplate;
    private static final long VERIFICATION_TIME = 3L; // 인증번호 유효시간 3분


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


    @Override
    public void SendSms(CertReqDTO certReqDTO) {
        String phoneNumber = certReqDTO.getPhoneNum();
        String verificationCode = generateRandomCode(8); // 8자리 인증번호 생성

        // Redis에 인증번호 저장 (3분 유효)
        redisTemplate.opsForValue()
                .set("SMS:" + phoneNumber, verificationCode,
                        Duration.ofMinutes(VERIFICATION_TIME));

        // SMS 메시지 생성
        smsCertificationUtil.sendSMS(phoneNumber, verificationCode);
    }


    // 랜덤 인증번호 생성
    private String generateRandomCode(int length) {
        Random random = new Random();
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            builder.append(random.nextInt(10));
        }
        return builder.toString();
    }

    // 인증번호 검증
    public boolean verifyCode(String phoneNumber, String code) {
        String savedCode = redisTemplate.opsForValue().get("SMS:" + phoneNumber);
        return savedCode != null && savedCode.equals(code);
    }
}

