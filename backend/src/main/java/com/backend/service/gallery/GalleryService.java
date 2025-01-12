package com.backend.service.gallery;

import com.backend.domain.User;
import com.backend.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface GalleryService {
    PresignedUrlResponse generatePresignedUrl(PresignedUrlRequest request, User user, String key);
    GalleryResDTO updateRecipients(Long galleryId, UpdateRecipientsReqDTO request);
    GalleryPageResDTO getFileUrlByUser(User user, int page, int size);
    List<GalleryRecipientRes> getFileUrlByUserAndRecipient(Long userId, Long recipientId);
    GalleryResDTO uploadFile(MultipartFile file, UploadDTO uploadDTO, User user, String locate, String date);
    String uploadProfile(MultipartFile file, Long id, User user);
    void deleteFiles(List<Long> ids, User user);

    void analyzeGallery();
}
