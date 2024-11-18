package com.backend.service.firebase;

import com.backend.domain.User;
import com.backend.dto.FcmMessage;
import com.backend.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.common.net.HttpHeaders;
import com.google.gson.JsonParseException;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Component
@RequiredArgsConstructor
public class FirebaseServiceImpl implements FirebaseService {

    private final String API_URL = "https://fcm.googleapis.com/v1/projects/my-firebase-project-a309/messages:send";
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;

    public void sendMessageTo(String targetToken, String title, String body, String name, String phone) throws IOException {
        String message = makeMessage(targetToken, title, body, name,phone);

        OkHttpClient client = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(message,
                MediaType.get("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                .url(API_URL)
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                .build();

        Response response = client.newCall(request).execute();

        System.out.println(response.body().string());
    }

    @Value("${app.img}")
    private String img;
    private String makeMessage(String targetToken, String title, String body, String str, String phone ) throws JsonParseException, JsonProcessingException {

        FcmMessage fcmMessage = FcmMessage.builder()
                .message(FcmMessage.Message.builder()
                        .token(targetToken)
                        .notification(FcmMessage.Notification.builder()
                                .title(title)
                                .body(body)
                                .image(img)
                                .android_channel_id("default_channel")
                                .build())
                        .data(FcmMessage.Data.builder()
                                .screenName("Absence")  // 예: "product_detail"
                                .name(str)
                                .phoneNumber(phone)// 예: 상품 ID 등
                                .build()
                        ).build()).validateOnly(false).build();

        return objectMapper.writeValueAsString(fcmMessage);
    }

    private String getAccessToken() throws IOException {
        String firebaseConfigPath = "firebase/firebase_service_key.json";

        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
                .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));

        googleCredentials.refreshIfExpired();
        return googleCredentials.getAccessToken().getTokenValue();
    }

    @Scheduled(cron = "0 0 0 * * *") //자정에 실행
    public void sendPushNotification() throws IOException {
//        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7); // 7일이 지난 경우
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusSeconds(1); // 1초 지난 경우
        List<User> user = userRepository.findByLastLogin(oneWeekAgo);
        //각 유저에게 푸쉬
        for(User u : user){
            String token = u.getFcmToken();
            System.out.println(u.getName() + "님 발송");
            System.out.println("토큰 : " + u.getFcmToken());
            if(token != null && u.isPush()){
                String body = u.getName() + "님이 남기신 유언을 확인해주세요.";
                this.sendMessageTo(token, "채비", body, u.getName(),u.getPhone());
            }
        }
    }
}
