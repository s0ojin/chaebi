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


    private static final String[] OBITUARY_KEYWORDS = {
                "부고", "소천", "작고", "고인", "별세", "영면", "장례", "발인", "천국환송", "천국환승"
        };

        private static final String[] NAME_PREFIXES = {
                "고인", "고", "故", "선친", "빙부", "빙모", "장인", "장모"
        };

        private static final String[] NAME_SUFFIXES = {
                "님", "씨", "전", "께서", "님께서"
        };

        @Override
        public boolean isObituaryMessage(String body) {
            if (body == null || body.trim().isEmpty()) {
                return false;
            }

            // 대소문자 구분 없이 검색하기 위해 소문자로 변환
            String normalizedBody = body.toLowerCase();

            // 부고 키워드 검색
            for (String keyword : OBITUARY_KEYWORDS) {
                if (normalizedBody.contains(keyword.toLowerCase())) {
                    // 추가적인 문맥 검증
                    // 예: "부고입니다", "부고알림", "부고소식" 등의 패턴이 있는지 확인
                    if (hasObituaryContext(normalizedBody, keyword)) {
                        return true;
                    }
                }
            }
            return false;
        }

        private boolean hasObituaryContext(String body, String keyword) {
            // 부고 문맥을 가진 일반적인 패턴들
            String[] contextPatterns = {
                    keyword + "\\s*입니다",
                    keyword + "\\s*알림",
                    keyword + "\\s*소식",
                    keyword + "\\s*드립니다"
            };

            for (String pattern : contextPatterns) {
                if (Pattern.compile(pattern).matcher(body).find()) {
                    return true;
                }
            }

            // 단순 키워드만 있어도 부고로 간주
            return true;
        }

        @Override
        public String extractDeceasedName(String body) {
            if (body == null || body.trim().isEmpty()) {
                return "";
            }

            // 여러 이름 추출 패턴 시도
            String name = tryExtractNameWithPatterns(body);

            // 추출된 이름이 있으면 후처리
            if (!name.isEmpty()) {
                name = postProcessExtractedName(name);
                return name;
            }

            return "";
        }

        private String tryExtractNameWithPatterns(String body) {
            // 1. "고 홍길동님" 형태
            for (String prefix : NAME_PREFIXES) {
                for (String suffix : NAME_SUFFIXES) {
                    String pattern = prefix + "\\s+([가-힣]{2,4})" + suffix;
                    Pattern p = Pattern.compile(pattern);
                    Matcher m = p.matcher(body);
                    if (m.find()) {
                        return m.group(1);
                    }
                }
            }

            // 2. "홍길동님께서 별세하셨습니다" 형태
            String pattern2 = "([가-힣]{2,4})(님께서|님이|께서)\\s*(별세|소천|작고|영면)";
            Pattern p2 = Pattern.compile(pattern2);
            Matcher m2 = p2.matcher(body);
            if (m2.find()) {
                return m2.group(1);
            }

            // 3. 일반적인 이름 패턴 (2~4자 한글)
            for (String prefix : NAME_PREFIXES) {
                String pattern3 = prefix + "\\s+([가-힣]{2,4})";
                Pattern p3 = Pattern.compile(pattern3);
                Matcher m3 = p3.matcher(body);
                if (m3.find()) {
                    return m3.group(1);
                }
            }

            return "";
        }

        private String postProcessExtractedName(String name) {
            // 1. 앞뒤 공백 제거
            name = name.trim();

            // 2. 이름 길이 검증 (2~4자)
            if (name.length() < 2 || name.length() > 4) {
                return "";
            }

            // 3. 한글 이름만 허용
            if (!name.matches("^[가-힣]{2,4}$")) {
                return "";
            }

            // 4. 불필요한 접미사 제거
            for (String suffix : NAME_SUFFIXES) {
                if (name.endsWith(suffix)) {
                    name = name.substring(0, name.length() - suffix.length());
                }
            }

            return name;
        }


    @Override
    public void SendSms(CertReqDTO certReqDTO) {
        String phoneNumber = certReqDTO.getPhoneNum();
        //String verificationCode = generateRandomCode(8); // 8자리 인증번호 생성
        String verificationCode = "11111111";
        // Redis에 인증번호 저장 (3분 유효)
        redisTemplate.opsForValue()
                .set("SMS:" + phoneNumber, verificationCode,
                        Duration.ofMinutes(VERIFICATION_TIME));

        // SMS 메시지 생성
        System.out.println(verificationCode);
        //smsCertificationUtil.sendSMS(phoneNumber, verificationCode);
        System.out.println("문자 보냈다고 쳐");
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

    @Override
    public void sendSignal(String phone){
        User user = userRepository.findByPhone(phone).get();
        this.sendCode(user.getPhone(), user.getName());
    }

    @Override // 유족들 메시지 발송
    public void sendCode(String phoneNumber, String name) {
        User user = userRepository.findByPhone(phoneNumber).get();
        System.out.println(phoneNumber);
        if(user != null && user.getName().equals(name)) { // 전화번호와 이름이 일치할 경우
            for (RecipientResDTO r : recipientService.getRecipients(user)) {
                //String code = idConverterService.combineIds(user.getId(), r.getId());
                String code = idConverterService.generateRandomCode(r.getId()); //난수 코드
                System.out.println("code 생성");
                smsCertificationUtil.sendCode(r.getName(), r.getPhone(), code); // 유저의 열람인 모두에게 문자 발송
            }
        }else {
            System.out.println("이용자 확인 불가");
        }

    }
}

