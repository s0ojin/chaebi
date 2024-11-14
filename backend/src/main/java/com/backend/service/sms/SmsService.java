package com.backend.service.sms;

import com.backend.dto.CertReqDTO;

public interface SmsService {
    boolean isObituaryMessage(String body);
    String extractDeceasedName(String body);
    void SendSms(CertReqDTO certReqDTO);
    boolean verifyCode(String phoneNumber, String code);
    void sendCode(String phoneNumber, String code);
    void sendSignal(String phone);
}
