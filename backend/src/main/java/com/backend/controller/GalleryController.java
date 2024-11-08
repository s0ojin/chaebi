package com.backend.controller;

import com.backend.domain.User;
import com.backend.dto.*;
import com.backend.service.gallery.GalleryServiceImpl;
import com.backend.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
@Tag(name = "앨범관리", description = "앨범 API")
public class GalleryController {

    private final GalleryServiceImpl galleryService;
    private final UserService userService;

    @Operation(summary = "PresignedURL 생성")
    @PostMapping("/presigned")
    public ResponseEntity<PresignedUrlResponse> generatePresignedUrl(
            @RequestBody PresignedUrlRequest request,
            HttpServletRequest httpServletRequest
    ) {
        User user = userService.getUserByToken(httpServletRequest).get();
        PresignedUrlResponse response = galleryService.generatePresignedUrl(request, user);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "앨범 열람자 수정")
    @PutMapping("/{id}/recipients")
    public ResponseEntity<GalleryResDTO> updateRecipients(
            @PathVariable Long id,
            @RequestBody UpdateRecipientsReqDTO request
    ) {
        GalleryResDTO response = galleryService.updateRecipients(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "유저가 작성한 갤러리")
    @GetMapping("/userList")
    public ResponseEntity<?> getGalleryList(HttpServletRequest httpServletRequest) {
        User user = userService.getUserByToken(httpServletRequest).get();
        List<GalleryResDTO> list = galleryService.getFileUrlByUser(user);
        return ResponseEntity.ok(list);
    }

    @Operation(summary = "열람자만의 갤러리")
    @PostMapping("/recipientList")
    public ResponseEntity<?> generatePresignedUrl(
            @RequestParam Long recipientId,
            HttpServletRequest httpServletRequest
    ) {
        User user = userService.getUserByToken(httpServletRequest).get();
        List<GalleryResDTO> list = galleryService.getFileUrlByUserAndRecipient(user,recipientId);
        return ResponseEntity.ok(list);
    }

    @PostMapping(value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GalleryResDTO> uploadFile(@RequestParam("file") MultipartFile file, UploadDTO uploadDTO, HttpServletRequest request) {
        User user = userService.getUserByToken(request).get();
        try {
            GalleryResDTO response = galleryService.uploadFile(file,uploadDTO, user);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
