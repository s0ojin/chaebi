package com.backend.util;

import com.backend.domain.CustomUserDetails;
import com.backend.service.customUser.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// JWT 인증 필터 클래스
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    @Autowired
    private JwtUtil jwtUtil;


    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        // 로그인과 회원가입을 제외한 모든 경로에 대해 필터 적용
        return path.startsWith("/api/users/login") ||
                path.startsWith("/api/users/signup") ||
                path.equals("/") ||
                path.startsWith("/swagger-ui") ||
                path.startsWith("/v3/api-docs");}

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // 요청 헤더에서 "Authorization" 헤더를 가져옴
        final String authorizationHeader = request.getHeader("Authorization");

        String userPhone = null;
        String jwt = null;

        // Authorization 헤더가 있고 "Bearer "로 시작하는 경우 JWT 토큰을 추출
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // "Bearer " 이후의 JWT 토큰 부분만 추출
            userPhone = jwtUtil.getUserphoneFromToken(jwt); // JWT에서 사용자 이메일 추출
        }

        // 사용자가 인증되지 않았고 유효한 사용자 이름이 있는 경우
        if (userPhone != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // 사용자 이름으로 사용자 정보 로드
            CustomUserDetails userDetails = (CustomUserDetails) this.userDetailsService.loadUserByUsername(userPhone);
            // JWT 토큰이 유효한 경우
            if (jwtUtil.validateToken(jwt)) {
                // 사용자 인증을 위한 인증 토큰 생성
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                // 요청 정보로부터 인증 세부 사항 설정
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // 보안 컨텍스트에 인증 정보 설정
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }else {
            // JWT가 null인 경우 또는 만료된 경우 처리
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("JWT Token is expired or invalid");
            return;
        }
        // 다음 필터로 요청과 응답을 전달
        filterChain.doFilter(request, response);
    }
}

