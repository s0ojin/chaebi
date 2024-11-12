package com.backend.controller;

import com.backend.dto.CertReqDTO;
import com.backend.dto.LoginDTO;
import com.backend.dto.SignDTO;
import com.backend.repository.UserRepository;
import com.backend.service.sms.SmsService;
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
    private final UserServiceImpl userServiceImpl;
    private final UserRepository userRepository;
    private final SmsService smsService;


    @Operation(summary = "유저 회원가입", description = "Register a new user.")
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignDTO signDTO, HttpServletResponse response){
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
            userServiceImpl.login(loginDTO, response);
            //로그인 되었을 때 토큰 발급
            return ResponseEntity.ok().body("로그인 되었습니다."); // 로그인 성공
        }
    }

    @Operation(summary = "유저 로그아웃", description = "LOG OUT")
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        userServiceImpl.logout(request);
        return ResponseEntity.ok("로그아웃이 완료되었습니다."); //로그아웃(?)
    }
}
