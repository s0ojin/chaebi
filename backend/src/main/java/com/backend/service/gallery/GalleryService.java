package com.backend.service.gallery;

import com.backend.domain.User;
import com.backend.dto.GalleryResDTO;
import com.backend.dto.PresignedUrlRequest;
import com.backend.dto.PresignedUrlResponse;
import com.backend.dto.UpdateRecipientsReqDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GalleryService {
    PresignedUrlResponse generatePresignedUrl(PresignedUrlRequest request, User user);
    GalleryResDTO updateRecipients(Long galleryId, UpdateRecipientsReqDTO request);
    void markAsRead(Long galleryId, Long recipientId);
    void uploadFile(PresignedUrlRequest request, User user, MultipartFile file);
    List<GalleryResDTO> getFileUrlByUser(User user);
    List<GalleryResDTO> getFileUrlByUserAndRecipient(User user, Long recipientId);
}
