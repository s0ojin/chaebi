package com.backend.service.user;

import com.backend.dto.*;
import com.backend.exception.UserNotFoundException;
import com.backend.service.sms.SmsService;
import jakarta.servlet.http.Cookie;
import com.backend.domain.User;
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
import com.backend.domain.UserStatus;

import java.time.LocalDateTime;
import java.util.Optional;

import static com.backend.domain.UserStatus.ALIVE;
import static com.backend.domain.UserStatus.DEACTIVATED;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    @Transactional
    public TokenRes signup(SignDTO signDTO, HttpServletResponse response) { //회원가입
        User user = User.builder()
                .phone(signDTO.getPhone())
                .status(ALIVE)
                .name(signDTO.getName())
                .fcmToken(signDTO.getFcmToken()) // fcm 토큰 저장
                .push(signDTO.isPush()) // 푸쉬알림 디폴트로 true
                .build();

        userRepository.save(user);
        return this.login(signDTO.getPhone(), response); // 회원가입 후 로그인 까지
    }

    @Transactional
    public TokenRes login(String phone, HttpServletResponse response) {
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다."));
            user.setLastLogin(LocalDateTime.now());
            TokenRes token = new TokenRes(user.getName(),user.getPhone(),jwtUtil.generateAccessToken(user.getPhone()),jwtUtil.generateRefreshToken(user.getPhone()));
            System.out.println(" token " + " " + token.getAccessToken());
            userRepository.save(user);
            return token;
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
        String userPhone = jwtUtil.getUserByJwt(request);
        System.out.println("phone : " + userPhone);
        Optional<User> user = userRepository.findByPhone(userPhone);
        System.out.println("user : " + user.get().getPhone());
        System.out.println("user OP : " + user);
        Optional<User> userInfo =  userRepository.findByPhone(userPhone);
        if(userInfo.isEmpty()){
            throw new UserNotFoundException("user not found " + userPhone);
        }

        return userInfo;
        //return userRepository.findByPhone("01011111111"); //테스트
    }

    @Override
    public void quit(HttpServletRequest request) {
        User user = this.getUserByToken(request).get();
        user.setStatus(DEACTIVATED);
        userRepository.save(user); // soft Delete
    }

    @Override
    public boolean ispush(HttpServletRequest request) {
        User user = this.getUserByToken(request).get();
        return user.isPush();
    }


}

