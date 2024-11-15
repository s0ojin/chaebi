package com.backend.repository;

import com.backend.domain.Gallery;
import com.backend.domain.Recipient;
import com.backend.domain.User;
import com.backend.dto.GalleryResDTO;
import com.backend.dto.PresignedUrlResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {
    List<Gallery> findAllByUser(User user);

    @Query("SELECT DISTINCT g FROM Gallery g " +
            "JOIN g.galleryRecipients gr " +
            "JOIN gr.recipient r " +
            "WHERE r.user = :user AND r.id = :recipientId")
    List<Gallery> findByRecipientUserAndRecipientId(
            @Param("user") User user,
            @Param("recipientId") Long recipientId
    );

    // 사용자가 올린 갤러리이거나 수신자로 지정된 갤러리 모두 검색
    @Query("SELECT DISTINCT g FROM Gallery g " +
            "LEFT JOIN g.galleryRecipients gr " +
            "LEFT JOIN gr.recipient r " +
            "WHERE g.user = :user OR " +
            "(r.user = :user AND r.id = :recipientId)")
    List<Gallery> findByUserOrRecipient(
            @Param("user") User user,
            @Param("recipientId") Long recipientId
    );
    Page<Gallery> findAllByUser(User user, Pageable pageable);
}
