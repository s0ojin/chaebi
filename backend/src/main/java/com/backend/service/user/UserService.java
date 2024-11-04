package com.backend.service.user;

import com.backend.domain.User;
import com.backend.dto.LoginDTO;
import com.backend.dto.SignDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Optional;

public interface UserService {
    void signup(SignDTO signDTO);
    User login(LoginDTO loginDTO, HttpServletResponse response);
    void logout(String id);

    Optional<User> getUser(String id);
    Optional<User> getUserByToken(HttpServletRequest request);
}