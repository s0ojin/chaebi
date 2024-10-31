package com.backend.util;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    // application.properties 또는 application.yml 파일에서 jwt.secret 값을 주입받음
    @Value("${jwt.secret}")
    private String jwtSecret;

    // application.properties 또는 application.yml 파일에서 jwt.expiration 값을 주입받음 (밀리초 단위)
    @Value("${jwt.expiration}")
    private int jwtExpirationMs;

    @Value("${jwt.refreshexpiration}")
    private int refreshExpirationMs;

    // 주어진 사용자 이메일로 JWT 토큰을 생성
    public String generateAccessToken(String userEmail) { //이메일로 할지 전화번호로 할지 고민
        return Jwts.builder()
                .setSubject(userEmail) // 토큰의 주체 설정 (사용자 고유 정보)
                .setIssuedAt(new Date()) // 토큰 발급 시간 설정
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)) // 토큰 만료 시간 설정
                .signWith(SignatureAlgorithm.HS512, jwtSecret.getBytes()) // HS512 알고리즘과 시크릿 키를 사용하여 서명
                .compact(); // JWT 토큰 생성
    }

    public String generateRefreshToken(String userEmail) {
        return Jwts.builder()
                .setSubject(userEmail)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + refreshExpirationMs))
                .signWith(SignatureAlgorithm.HS512,jwtSecret.getBytes())
                .compact();
    }

    // JWT 토큰에서 사용자 이메일을 추출
    public String getUsernameFromToken(String token) {
        // 서명 키를 사용하여 토큰을 파싱하고, 주체(subject)를 반환
        return Jwts.parser().setSigningKey(jwtSecret.getBytes()).parseClaimsJws(token).getBody().getSubject();
    }

    // 주어진 JWT 토큰의 유효성을 검사
    public boolean validateToken(String authToken) {
        try {
            // 서명 키를 사용하여 토큰을 파싱하여 유효한지 확인
            Jwts.parser().setSigningKey(jwtSecret.getBytes()).parseClaimsJws(authToken);
            return true; // 토큰이 유효한 경우 true 반환
        } catch (SignatureException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            // 서명 오류, 잘못된 형식의 JWT, 만료된 토큰, 지원되지 않는 JWT, 잘못된 인수 등 예외 발생 시 false 반환
            return false;
        }
    }
}

