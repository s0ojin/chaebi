package com.backend.controller;

import com.backend.domain.User;
import com.backend.dto.RequestDTO;
import com.backend.repository.UserRepository;
import com.backend.service.firebase.FirebaseServiceImpl;
import com.backend.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class FcmController {

    private final FirebaseServiceImpl firebaseService;
    private final UserService userService;
    private final UserRepository userRepository;


    @Operation(summary = "푸쉬 알람 테스트")
    @GetMapping("/api/fcm/test")
    public ResponseEntity<?> testMessage() throws IOException {
        try {
            firebaseService.sendPushNotification(); // 기존 메소드 호출
            return ResponseEntity.ok("푸시 알림 전송 성공!");
        } catch (Exception e) {
            return ResponseEntity.ok("푸시 알림 전송 실패: " + e.getMessage());
        }
    }


//    @Operation(summary = "유저의 fcm 토큰을 저장")
//    @PostMapping("/api/token")
//    public ResponseEntity pushToken(@RequestBody RequestDTO requestDTO, HttpServletRequest request) throws IOException {
//        User user = userService.getUserByToken(request).get(); //  유저 정보 받아옴
//        user.setFcmToken(requestDTO.getTargetToken());
//        userRepository.save(user);
//        return ResponseEntity.ok().build();
//    }
}
