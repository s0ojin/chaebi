package com.backend.service.user;

import jakarta.servlet.http.Cookie;
import com.backend.domain.User;
import com.backend.dto.LoginDTO;
import com.backend.dto.SignDTO;
import com.backend.repository.UserRepository;
import com.backend.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public void signup(SignDTO signDTO) { //회원가입
        if (userRepository.existsByPhone(signDTO.getPhone())) {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }

        User user = User.builder()
                .phone(signDTO.getPhone())
                .password(passwordEncoder.encode(signDTO.getPassword()))
                .status(true)
                .name(signDTO.getName())
                .loginAttemptPeriod(0)
                .secretQuestion(signDTO.getSecretQuestion())
                .secretAnswer(signDTO.getSecretAnswer())
                .build();

        userRepository.save(user);
    }

    @Transactional
    public User login(LoginDTO loginDTO, HttpServletResponse response) {
        User user = userRepository.findByPhone(loginDTO.getPhone())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다."));

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            user.setLoginAttemptPeriod(user.getLoginAttemptPeriod() + 1);
            userRepository.save(user);
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
        user.setLastLogin(LocalDateTime.now());
        user.setLoginAttemptPeriod(0);

        Cookie accessCookie = new Cookie("accessToken", jwtUtil.generateAccessToken(user.getPhone()));
        //accessCookie.setHttpOnly(true);
        //accessCookie.setSecure(true);
        accessCookie.setPath("/");
        accessCookie.setMaxAge(60*60*12);
        Cookie refreshCookie = new Cookie("refreshToken", jwtUtil.generateRefreshToken(user.getPhone()));
        //refreshCookie.setHttpOnly(true);
        //refreshCookie.setSecure(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(60*60*24*3);
        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);
        System.out.println(" token " + " " + accessCookie.getValue());
        return userRepository.save(user);
    }

    @Transactional
    public void logout(String phone) { //로그아웃 로직 고민
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다."));

    }

    @Override
    public Optional<User> getUser(String phone) { //아이디로 유저를 반환
        return userRepository.findByPhone(phone);
    }

    @Override
    public Optional<User> getUserByToken(HttpServletRequest request) { //JWT 토큰을 해석한 결과값으로 유저를 추출
        String userPhone = jwtUtil.getUserByJwt(request);
        System.out.println("email : " + userPhone);
        Optional<User> user = userRepository.findByPhone(userPhone);
        System.out.println("user : " + user.get().getPhone());
        System.out.println("user OP : " + user);
        return userRepository.findByPhone(userPhone);
    }


}

