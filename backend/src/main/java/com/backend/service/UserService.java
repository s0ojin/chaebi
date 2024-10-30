package com.backend.service;

import com.backend.domain.user.User;
import com.backend.dto.LoginDTO;
import com.backend.dto.SignDTO;
import jakarta.servlet.http.HttpServletResponse;

public interface UserService {
    void signup(SignDTO signDTO);
    User login(LoginDTO loginDTO, HttpServletResponse response);
    void logout(String id);

}
