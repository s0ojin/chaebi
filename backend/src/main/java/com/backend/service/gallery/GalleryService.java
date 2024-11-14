package com.backend.service.gallery;

import com.backend.domain.User;
import com.backend.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface GalleryService {
    PresignedUrlResponse generatePresignedUrl(PresignedUrlRequest request, User user, String key);
    GalleryResDTO updateRecipients(Long galleryId, UpdateRecipientsReqDTO request);
    void markAsRead(Long galleryId, Long recipientId);
    List<GalleryResDTO> getFileUrlByUser(User user);
    List<GalleryRecipientRes> getFileUrlByUserAndRecipient(User user, Long recipientId);
    GalleryResDTO uploadFile(MultipartFile file, UploadDTO uploadDTO, User user);
    String uploadProfile(MultipartFile file, Long id, User user);
    void deleteFiles(List<Long> ids, User user);
}
