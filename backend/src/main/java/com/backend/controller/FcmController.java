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
    @PostMapping("/api/fcm")
    public ResponseEntity pushMessage(@RequestBody RequestDTO requestDTO) throws IOException {
        System.out.println(requestDTO.getTargetToken());
        firebaseService.sendMessageTo(
                requestDTO.getTargetToken(),
                "채비",
                "입장하세요");
        return ResponseEntity.ok().build();
    }


    @Operation(summary = "유저의 fcm 토큰을 저장")
    @PostMapping("/api/token")
    public ResponseEntity pushToken(@RequestBody RequestDTO requestDTO, HttpServletRequest request) throws IOException {
        User user = userService.getUserByToken(request).get(); //  유저 정보 받아옴
        user.setFcmToken(requestDTO.getTargetToken());
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}
