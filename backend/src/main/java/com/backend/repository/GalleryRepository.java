package com.backend.repository;

import com.backend.domain.Gallery;
import com.backend.domain.Recipient;
import com.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {
    List<Gallery> findByUserAndRecipient(User user, Recipient recipient);
}