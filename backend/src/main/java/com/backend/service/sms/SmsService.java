package com.backend.service.sms;

public interface SmsService {
    boolean isObituaryMessage(String body);
    String extractDeceasedName(String body);
}
