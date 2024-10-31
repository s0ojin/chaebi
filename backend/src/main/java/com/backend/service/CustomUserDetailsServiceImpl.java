package com.backend.service;

import com.backend.domain.customUser.CustomUserDetails;
import com.backend.domain.user.User;
import com.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsServiceImpl implements CustomUserDetailsService {

    @Autowired
    private UserRepository userRepository;



    @Override
    public CustomUserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + id));
        if(user == null) {
            throw new UsernameNotFoundException("User not found with id: " + id);
        }
        return new CustomUserDetails(user);
    }
}

