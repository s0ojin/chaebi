package com.backend.controller;

import com.backend.dto.CertReqDTO;
import com.backend.dto.MessageDTO;
import com.backend.dto.VerifyDTO;
import com.backend.service.sms.SmsService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/sms")
@RequiredArgsConstructor
@Tag(name = "SMS 관리", description = "SMS을 수신, 발송, 처리")
public class SmsController {

    private final SmsService smsService;

    @PostMapping("/analyze")
    public ResponseEntity<String> analyzeMessage(@RequestBody MessageDTO message) {
        if (smsService.isObituaryMessage(message.getBody())) {
            String deceasedName = smsService.extractDeceasedName(message.getBody());
            return ResponseEntity.ok("부고 문자 확인. 돌아가신 분: " + deceasedName);
        } else {
            return ResponseEntity.ok("일반 문자입니다.");
        }
    }

    // SMS 인증번호 발송
    @PostMapping("/send")
    public ResponseEntity<?> sendSms(@RequestBody CertReqDTO request) {
        smsService.SendSms(request);
        return ResponseEntity.ok().build();
    }

    // SMS 인증번호 검증
    @PostMapping("/verify")
    public ResponseEntity<Boolean> verifySms(@RequestBody VerifyDTO request) {
        boolean isValid = smsService.verifyCode(
                request.getPhoneNum(),
                request.getCode()
        );
        return ResponseEntity.ok(isValid);
    }
}
