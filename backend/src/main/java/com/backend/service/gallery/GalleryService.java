package com.backend.service.gallery;

import com.backend.domain.User;
import com.backend.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GalleryService {
    PresignedUrlResponse generatePresignedUrl(PresignedUrlRequest request, User user);
    GalleryResDTO updateRecipients(Long galleryId, UpdateRecipientsReqDTO request);
    void markAsRead(Long galleryId, Long recipientId);
    List<GalleryResDTO> getFileUrlByUser(User user);
    List<GalleryResDTO> getFileUrlByUserAndRecipient(User user, Long recipientId);
    GalleryResDTO uploadFile(MultipartFile file,UploadDTO uploadDTO, User user);
}
