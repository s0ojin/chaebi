package com.backend.util;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SmsCertificationUtil {
    @Value("${coolsms.apikey}")
    private String apiKey;

    @Value("${coolsms.apisecret}")
    private String apiSecret;

    @Value("${coolsms.fromnumber}")
    private String fromNumber;

    DefaultMessageService messageService;

    @PostConstruct // 의존성 주입 완료 후 초기화 수행
    public void init() {
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
    }

    // 단일 메시지 발송
    public void sendSMS(String from, String to, String certificationCode){
        Message message = new Message(); // 새 메시지 객체 생성
        message.setFrom(fromNumber); // 발신자 번호 설정
        message.setTo(to); // 수신자 번호 설정
        message.setText("본인확인 인증번호는 " + certificationCode + "입니다."); // 메시지 내용 설정

        this.messageService.sendOne(new SingleMessageSendingRequest(message)); // 메시지 발송 요청
    }

    public void sendCode(String from, String name,String to, String code){
        String template = "";
        String messageContent =
                "안녕하세요. 고인이 생전 작성하셨던 기록을 전달해드리는 채비입니다.\n\n" +
                        from + "님께서 " + name + "님께 기록을 남기셨습니다. 접속하여 코드를 입력하시고 기록을 확인해보세요.\n\n" +
                        "http://k11a309.p.ssafy.io/\n\n" +
                        name + "님 열람 코드는 " + code + "입니다.";
        Message message = new Message(); // 새 메시지 객체 생성
        message.setFrom(fromNumber); // 발신자 번호 설정
        message.setTo(to); // 수신자 번호 설정
        message.setText(messageContent); // 메시지 내용 설정
        System.out.println("유족 문자발송");
        this.messageService.sendOne(new SingleMessageSendingRequest(message)); // 메시지 발송 요청
    }
}
