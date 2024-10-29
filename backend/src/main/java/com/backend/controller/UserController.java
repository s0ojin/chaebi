package com.backend.controller;

import com.backend.dto.LoginDTO;
import com.backend.dto.SignDTO;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignDTO signDTO){
        userService.signup(signDTO);

        return ResponseEntity.ok().body("Sign up successful");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO){
        userService.login(loginDTO);
        //로그인 되었을 때 토큰 발급
        return ResponseEntity.ok().body("Sign up successful");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestParam String id) {
        userService.logout(id);
        return ResponseEntity.ok("로그아웃이 완료되었습니다.");
    }
}
