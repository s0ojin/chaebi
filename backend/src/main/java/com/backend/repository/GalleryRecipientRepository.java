package com.backend.repository;

import com.backend.domain.GalleryRecipient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GalleryRecipientRepository extends JpaRepository<GalleryRecipient, Long> {
    Optional<GalleryRecipient> findByGalleryIdAndRecipientId(Long galleryId, Long recipientId);
    List<GalleryRecipient> findByRecipientId(Long recipientId);
    List<GalleryRecipient> findByGalleryId(Long galleryId);
}
