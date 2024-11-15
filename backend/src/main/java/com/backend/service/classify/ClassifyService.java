package com.backend.service.classify;

import com.backend.dto.ClassifiedGalleries;
import com.backend.dto.GalleryRecipientRes;

import java.util.List;

public interface ClassifyService {
    List<GalleryRecipientRes> getFileUrlByUserAndRecipient(Long userId, Long recipientId);
    ClassifiedGalleries getClassifiedGalleries(Long userId, Long recipientId);
    ClassifiedGalleries classifyGalleries(List<GalleryRecipientRes> galleries);

}


