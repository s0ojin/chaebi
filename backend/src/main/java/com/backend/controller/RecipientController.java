package com.backend.controller;

import com.backend.domain.User;
import com.backend.dto.*;
import com.backend.service.letter.LetterService;
import com.backend.service.recipient.RecipientService;
import com.backend.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recipient")
@RequiredArgsConstructor
@Tag(name = "열람자 관리", description = "사용자의 열람자를 관리")
@Validated
public class RecipientController {
    private final RecipientService recipientService;
    private final LetterService letterService;
    private final UserService userService;

    @Operation(summary = "열람자 등록")
    @PostMapping(value = "create",consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createRecipient(
            @RequestPart(value = "file", required = false) MultipartFile file,
            @RequestPart(value = "data") RecipientDTO recipientDTO,
            HttpServletRequest request) {

        Optional<User> user = userService.getUserByToken(request);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("존재하지 않는 사용자입니다.");
        }

        try {
            Long id = recipientService.createRecipient(recipientDTO, user.get(), file);
            System.out.println("열람자 생성 아이디 : " + id);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("열람자 생성 실패: " + e.getMessage());
        }
    }

    @Operation(summary = "열람자 상세")
    @GetMapping("/{id}")
    public ResponseEntity<?> getRecipientById(@PathVariable long id) {
        return ResponseEntity.ok(recipientService.getRecipient(id));
    }

    @Operation(summary = "열람자 목록")
    @GetMapping("/list")
    public ResponseEntity<List<RecipientResDTO>> getRecipientList(HttpServletRequest request) {
        // JWT를 통해 사용자 정보를 가져옴
        Optional<User> user = userService.getUserByToken(request);
        if (user.isPresent()) {
            List<RecipientResDTO> recipients = recipientService.getRecipients(user.get());
            return ResponseEntity.ok(recipients);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 유효하지 않은 토큰
        }
    }

    @Operation(summary = "열람자 정보 수정")
    @PutMapping(value = "/update",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateRecipient(@RequestPart(value = "file", required = false) MultipartFile file,
                                                  @RequestPart(value = "data") RecipientDTO recipientDTO,
                                                  @RequestParam(value = "recipientId") Long recipientId,
                                                  HttpServletRequest request) {
        Optional<User> user = userService.getUserByToken(request);
        if (user.isPresent()) {
            recipientService.updateRecipient(recipientDTO, user.get(), file, recipientId);
            return ResponseEntity.ok("열람자의 정보가 업데이트되었습니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 유효하지 않은 토큰
        }
    }

    @Operation(summary = "열람자 삭제")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRecipient(@PathVariable long id) {
        recipientService.deleteRecipient(id);
        return ResponseEntity.ok("열람자가 삭제되었습니다.");
    }

    @Operation(summary = "열람자 입장")
    @PostMapping("/enter")
    public ResponseEntity<?> enterRecipient(@RequestBody EnterReq enterDTO) {
        EnterRes res = recipientService.enterRecipient(enterDTO);

        return ResponseEntity.ok(res);
    }



}
