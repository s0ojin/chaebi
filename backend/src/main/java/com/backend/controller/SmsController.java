package com.backend.controller;

import com.backend.dto.CertReqDTO;
import com.backend.dto.MessageDTO;
import com.backend.dto.PairDTO;
import com.backend.dto.VerifyDTO;
import com.backend.service.idconvert.IdConverterService;
import com.backend.service.sms.SmsService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/sms")
@RequiredArgsConstructor
@Tag(name = "SMS 관리", description = "SMS을 수신, 발송, 처리")
public class SmsController {

    private final SmsService smsService;
    private final IdConverterService idConverterService;

    @PostMapping("/analyze")
    public void analyzeMessage(@RequestBody MessageDTO message) {
        if (smsService.isObituaryMessage(message.getBody())) {
            String deceasedName = smsService.extractDeceasedName(message.getBody());
            System.out.println("문자 받음");

        } else {
            System.out.println("부고문자 아님");
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

    // ID 변환 테스트
    @GetMapping("/combine")
    public ResponseEntity<String> combineIds(
            @RequestParam String userId,
            @RequestParam String recipientId
    ) {
        String combined = idConverterService.combineIds(userId, recipientId);
        return ResponseEntity.ok(combined);
    }

    @GetMapping("/extract/{combinedId}")
    public ResponseEntity<PairDTO> extractIds(@PathVariable String combinedId) {
        PairDTO ids = idConverterService.extractIds(combinedId);
        return ResponseEntity.ok(ids);
    }
}
