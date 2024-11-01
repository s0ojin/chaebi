package com.backend.controller;

import com.backend.domain.Letter;
import com.backend.domain.User;
import com.backend.repository.LetterRepository;
import com.backend.service.letter.LetterService;
import com.backend.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/letter")
@Tag(name = "편지 관리", description = "이용자의 편지를 관리합니다.")
@RequiredArgsConstructor
public class LetterController {

    private final LetterService letterService;
    private final UserService userService;
    private final LetterRepository letterRepository;

    @Operation(summary = "편지 작성")
    @PostMapping("/make")
    public ResponseEntity<?> makeLetter(@RequestBody Letter letter, HttpServletRequest request) {
        User user = userService.getUserByToken(request).get();
        System.out.println(user.getPhone());
        letter.setUser(user);
        letterService.createLetter(letter);
        return ResponseEntity.ok("생성되었습니다.");
    }

    @Operation(summary = "편지 수정")
    @PostMapping("/update")
    public ResponseEntity<?> updateLetter(@RequestBody Letter letter, HttpServletRequest request) {
        User user = userService.getUserByToken(request).get();
        letter.setUser(user);
        letterService.updateLetter(letter);
        return ResponseEntity.ok("수정되었습니다.");
    }

    @Operation(summary = "편지 상세보기")
    @GetMapping("/{id}")
    public ResponseEntity<?> getLetter(@PathVariable Long id) {
        Letter letter = letterService.getLetter(id);
        return ResponseEntity.ok(letter);
    }

    @Operation(summary = "편지 목록")
    @GetMapping("/list")
    public ResponseEntity<?> getLetters(HttpServletRequest request) {
        User user = userService.getUserByToken(request).get();

        return ResponseEntity.ok(letterService.getLetters(user));
    }

    @Operation(summary = "편지 삭제")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLetter(@PathVariable Long id) {
        letterService.deleteLetter(id);
        return ResponseEntity.ok("삭제되었습니다.");
    }



}
