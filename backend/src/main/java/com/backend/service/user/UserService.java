package com.backend.service.user;

import com.backend.domain.User;
import com.backend.dto.LoginDTO;
import com.backend.dto.SettingDTO;
import com.backend.dto.SignDTO;
import com.backend.dto.TokenRes;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Optional;

public interface UserService {
    TokenRes signup(SignDTO signDTO, HttpServletResponse response);
    TokenRes login(String phone, HttpServletResponse response);
    void logout(HttpServletRequest request);
    void setting(SettingDTO settingDTO, HttpServletRequest request);
    Optional<User> getUser(String id);
    Optional<User> getUserByToken(HttpServletRequest request);
    void quit(HttpServletRequest request);
    boolean ispush(HttpServletRequest request);
}
