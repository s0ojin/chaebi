package com.backend.service.user;

import com.backend.dto.CertReqDTO;
import com.backend.dto.SettingDTO;
import com.backend.service.sms.SmsService;
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
    public void signup(SignDTO signDTO, HttpServletResponse response) { //회원가입
        User user = User.builder()
                .phone(signDTO.getPhone())
                .status(true)
                .name(signDTO.getName())
                .loginAttemptPeriod(0)
                .fcmToken(signDTO.getFcmToken()) // fcm 토큰 저장
                .push(true) // 푸쉬알림 디폴트로 true
                .build();

        userRepository.save(user);
        this.login(signDTO.getPhone(), response); // 회원가입 후 로그인 까지
    }

    @Transactional
    public void login(String phone, HttpServletResponse response) {
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다."));
            user.setLastLogin(LocalDateTime.now());

            Cookie accessCookie = new Cookie("accessToken", jwtUtil.generateAccessToken(user.getPhone()));
            //accessCookie.setHttpOnly(true);
            //accessCookie.setSecure(true);
            accessCookie.setPath("/");
            accessCookie.setMaxAge(60 * 60 * 12);
            Cookie refreshCookie = new Cookie("refreshToken", jwtUtil.generateRefreshToken(user.getPhone()));
            //refreshCookie.setHttpOnly(true);
            //refreshCookie.setSecure(true);
            refreshCookie.setPath("/");
            refreshCookie.setMaxAge(60 * 60 * 24 * 3);
            response.addCookie(accessCookie);
            response.addCookie(refreshCookie);
            System.out.println(" token " + " " + accessCookie.getValue());
            userRepository.save(user);
    }

    @Transactional
    public void logout(HttpServletRequest request) { //로그아웃 로직 고민
        User user = this.getUserByToken(request).get();
    }

    @Override
    public void setting(SettingDTO settingDTO, HttpServletRequest request) {
        User user = this.getUserByToken(request).get();
        user.setPush(settingDTO.isPush());
        userRepository.save(user);
    }

    @Override
    public Optional<User> getUser(String phone) { //아이디로 유저를 반환
        return userRepository.findByPhone(phone);
    }

    @Override
    public Optional<User> getUserByToken(HttpServletRequest request) { //JWT 토큰을 해석한 결과값으로 유저를 추출
//        String userPhone = jwtUtil.getUserByJwt(request);
//        System.out.println("email : " + userPhone);
//        Optional<User> user = userRepository.findByPhone(userPhone);
//        System.out.println("user : " + user.get().getPhone());
//        System.out.println("user OP : " + user);
//        return userRepository.findByPhone(userPhone);
        return userRepository.findByPhone("010-1111-1111"); //테스트
    }

    @Override
    public void quit(HttpServletRequest request) {
        User user = this.getUserByToken(request).get();
        user.setStatus(false);
        userRepository.save(user); // soft Delete
    }


}

