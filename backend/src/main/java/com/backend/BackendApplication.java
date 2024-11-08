package com.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Base64;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzMwMzU1MzIxLCJleHAiOjE3MzAzNTk2NDF9.afZ_ocSOO1WgPYdexf1hdK6bUawitR0nfdPAMy7LnxnjSqoxDwxZXQQ7CTvTTFeXHL6ucxi3vGtZ6_rmMwwdjg";

        String[] parts = token.split("\\.");
        String header = new String(Base64.getUrlDecoder().decode(parts[0]));
        String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
        System.out.println("Header: " + header);
        System.out.println("Payload: " + payload);

        long currentTimeMillis = System.currentTimeMillis() / 1000; // 초 단위로 변환
        System.out.println("Current Time: " + currentTimeMillis);

        SpringApplication.run(BackendApplication.class, args);
    }

}
