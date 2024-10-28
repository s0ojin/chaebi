package com.backend.service;


import com.backend.domain.user.User;
import com.backend.dto.LoginDTO;
import com.backend.dto.SignDTO;
import com.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void signup(SignDTO userDTO) {
        if (userRepository.existsById(userDTO.getId())) {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }

        User user = User.builder()
                .id(userDTO.getId())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .phone(userDTO.getPhone())
                .email(userDTO.getEmail())
                .status(true)
                .loginAttemptPeriod(0)
                .secretQuestion(userDTO.getSecretQuestion())
                .secretAnswer(userDTO.getSecretAnswer())
                .build();

        userRepository.save(user);
    }

    @Transactional
    public User login(LoginDTO loginDTO) {
        User user = userRepository.findById(loginDTO.getId())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다."));

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            user.setLoginAttemptPeriod(user.getLoginAttemptPeriod() + 1);
            userRepository.save(user);
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        user.setLastLogin(LocalDateTime.now());
        user.setLoginAttemptPeriod(0);
        return userRepository.save(user);
    }

    @Transactional
    public void logout(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다."));

    }
}

