package com.backend.service.sms;

import com.backend.domain.Recipient;
import com.backend.domain.User;
import com.backend.dto.CertReqDTO;
import com.backend.dto.RecipientResDTO;
import com.backend.repository.UserRepository;
import com.backend.service.idconvert.IdConverterService;
import com.backend.service.recipient.RecipientService;
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
    private final IdConverterService idConverterService;
    private final RedisTemplate<String, String> redisTemplate;
    private final UserRepository userRepository;
    private final RecipientService recipientService;
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
        return ""; // 추출 실패 시 기본 메시지
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

    @Override // 유족들 메시지 발송
    public void sendCode(String phoneNumber, String name) {
        String phone = "01011111111"; // 잘 넘어오는지 확인
        name = "홍길동";
        User user = userRepository.findByPhone(phone).get();
        System.out.println(phoneNumber);
        if(user != null && user.getName().equals(name)) { // 전화번호와 이름이 일치할 경우
            for(RecipientResDTO r : recipientService.getRecipients(user)){
                //String code = idConverterService.combineIds(user.getId(), r.getId());
                String code = idConverterService.generateRandomCode(r.getId()); //난수 코드
                System.out.println("code 생성");
                smsCertificationUtil.sendCode(r.getName(),r.getPhone(), code); // 유저의 열람인 모두에게 문자 발송
            }
        }
        System.out.println("이용자 확인 불가");
    }
}

