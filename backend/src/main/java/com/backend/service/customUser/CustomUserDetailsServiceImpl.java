package com.backend.service.customUser;

import com.backend.domain.CustomUserDetails;
import com.backend.domain.User;
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
    public CustomUserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        //Email로 사용자 여부 판단 (추후에 변경될 수 있음)
        User user = userRepository.findByPhone(phone).orElseThrow(() -> new UsernameNotFoundException("User not found with Phone: " + phone));
        if(user == null) {
            throw new UsernameNotFoundException("User not found with phone: " + phone);
        }
        return new CustomUserDetails(user);
    }
}

