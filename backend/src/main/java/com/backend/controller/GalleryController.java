package com.backend.controller;

import com.backend.domain.User;
import com.backend.dto.*;
import com.backend.exception.NotFoundException;
import com.backend.exception.UnauthorizedException;
import com.backend.service.gallery.GalleryServiceImpl;
import com.backend.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
@Tag(name = "앨범관리", description = "앨범 API")
public class GalleryController {

    private final GalleryServiceImpl galleryService;
    private final UserService userService;

//    @Operation(summary = "PresignedURL 생성")
//    @PostMapping("/presigned")
//    public ResponseEntity<PresignedUrlResponse> generatePresignedUrl(
//            @RequestBody PresignedUrlRequest request,
//            HttpServletRequest httpServletRequest
//    ) {
//        User user = userService.getUserByToken(httpServletRequest).get();
//        PresignedUrlResponse response = galleryService.generatePresignedUrl(request, user);
//        return ResponseEntity.ok(response);
//    }

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
        List<GalleryResDTO> list = galleryService.getFileUrlByUserAndRecipient(user, recipientId);
        return ResponseEntity.ok(list);
    }

    @PostMapping(value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<GalleryResDTO>> uploadFiles(
            @RequestParam("files") List<MultipartFile> files,
            UploadDTO uploadDTO,
            HttpServletRequest request) {

        User user = userService.getUserByToken(request).get();
        List<GalleryResDTO> responses = new ArrayList<>();

        try {
            // 파일이 비어있는지 체크
            if (files.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            // 각 파일별로 처리
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    GalleryResDTO response = galleryService.uploadFile(file, uploadDTO.getRecipientIds(), user);
                    responses.add(response);
                }
            }

            return ResponseEntity.ok(responses);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteGallery(DeleteFileReq req, HttpServletRequest request) {
        User user = userService.getUserByToken(request).get();

        try {
            galleryService.deleteFiles(req.getFileIds(), user);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (Exception e) {
            // 로그 기록
            return ResponseEntity.internalServerError().build();
        }
    }
}


