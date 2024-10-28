package com.backend.controller;

import com.backend.dto.LoginDTO;
import com.backend.dto.SignDTO;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.RequestEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @RequestMapping("/signup")
    public RequestEntity<String> signup(@RequestBody SignDTO signDTO){

    }

    @RequestMapping("/login")
    public RequestEntity<String> login(@RequestBody LoginDTO loginDTO){

    }
}
