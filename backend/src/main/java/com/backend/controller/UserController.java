package com.backend.controller;

import com.backend.domain.User;
import com.backend.dto.*;
import com.backend.repository.UserRepository;
import com.backend.service.firebase.FirebaseService;
import com.backend.service.sms.SmsService;
import com.backend.service.user.UserService;
import com.backend.service.user.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
@Validated // DTO 유효성 검사 활성화
@Tag(name = "사용자 회원관리", description = "회원정보 관련 서비스")
public class UserController {
    private final UserService userServiceImpl;
    private final UserRepository userRepository;
    private final FirebaseService firebaseService;


    @Operation(summary = "유저 회원가입", description = "Register a new user.")
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignDTO signDTO, HttpServletResponse response){
        if(signDTO.getFcmToken().isEmpty())
            return ResponseEntity.status(415).body("token : " + signDTO.getFcmToken());
        System.out.println("token : " + signDTO.getFcmToken());
        userServiceImpl.signup(signDTO, response);
        return ResponseEntity.ok().body("Sign up successful"); //회원가입 성공
    }

    @Operation(summary = "유저 로그인", description = "LOG IN")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO, HttpServletResponse response){
        if(!userRepository.findByPhone(loginDTO.getPhone()).isPresent()){ //저장되지 않은 번호라면
            return ResponseEntity.status(215).body("회원가입 해야합니다.");
        }
        else {
           TokenRes token =  userServiceImpl.login(loginDTO.getPhone(), response);
            //로그인 되었을 때 토큰 발급
            System.out.println("로그인 성공  token : " + token.getAccessToken());
            return ResponseEntity.ok().body(token); // 로그인 성공
        }
    }

    @Operation(summary = "유저 로그아웃", description = "LOG OUT")
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        userServiceImpl.logout(request);
        return ResponseEntity.ok("로그아웃이 완료되었습니다."); //로그아웃(?)
    }

    @Operation(summary = "유저 설정", description = "설정 기능")
    @PostMapping("/setting")
    public ResponseEntity<String> setting(SettingDTO settingDTO, HttpServletRequest request) {
        userServiceImpl.logout(request);
        return ResponseEntity.ok("로그아웃이 완료되었습니다."); //로그아웃(?)
    }

    @Operation(summary = "유저 탈퇴", description = "탈퇴")
    @DeleteMapping("/quit")
    public ResponseEntity<String> quit(HttpServletRequest request) {
        userServiceImpl.quit(request);
        return ResponseEntity.ok("탈퇴되었습니다.");
    }
}
