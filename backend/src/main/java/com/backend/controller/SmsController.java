package com.backend.controller;

import com.backend.dto.CertReqDTO;
import com.backend.dto.MessageDTO;
import com.backend.dto.PairDTO;
import com.backend.dto.VerifyDTO;
import com.backend.repository.UserRepository;
import com.backend.service.idconvert.IdConverterService;
import com.backend.service.sms.SmsService;
import io.swagger.v3.oas.annotations.Operation;
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
    private final UserRepository userRepository;


    @Operation(summary = "문자 분석", description = "부고 문자인지 확인")
    @PostMapping("/analyze")
    public void analyzeMessage(@RequestBody MessageDTO message) {
        System.out.println(message.getBody());
        String cleanedBody = message.getBody().replaceAll("\\r\\n|\\r|\\n", " ");
        if (smsService.isObituaryMessage(message.getBody())) {
            String deceasedName = smsService.extractDeceasedName(message.getBody());
            if(deceasedName != null) {
                smsService.sendCode(message.getOriginatingAddress(), deceasedName);
            }
            System.out.println("문자 받음");

        } else {
            System.out.println("부고문자 아님");
        }
    }

    // SMS 인증번호 발송
    @Operation(summary = "인증 메시지 발송", description = "인증 메시지 발송")
    @PostMapping("/cert")
    public ResponseEntity<?> sendSms(@RequestBody CertReqDTO request) {
        smsService.SendSms(request);
        return ResponseEntity.ok().build();
    }

    // SMS 인증번호 검증
    @Operation(summary = "문자 인증 확인", description = "문자 인증 확인 ")
    @PostMapping("/verify")
    public ResponseEntity<Boolean> verifySms(@RequestBody VerifyDTO request) {
        boolean isValid = smsService.verifyCode(
                request.getPhoneNum(),
                request.getCode()
        );
        return ResponseEntity.ok(isValid);
    }

    @Operation(summary = "코드 문자 발송 버튼", description = "열람자 들에게 코드 발송")
    @PostMapping("/send")
    public ResponseEntity<?> sendCode(@RequestBody CertReqDTO request) {
        smsService.sendSignal(request.getPhoneNum());
        return ResponseEntity.ok("코드발송"); // 수정 필요
    }


    // ID 변환 테스트

}
