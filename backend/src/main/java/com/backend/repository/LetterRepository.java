package com.backend.repository;

import com.backend.domain.Letter;
import com.backend.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LetterRepository extends JpaRepository<Letter, Long> {
    List<Letter> findByUser(User user);

    // 특정 사용자가 작성하고 특정 수신자에게 보낸 편지 조회
    @Query("SELECT DISTINCT l FROM Letter l " +
            "JOIN l.letterRecipients lr " +
            "WHERE l.user = :user " +
            "AND lr.recipient.id = :recipientId")
    List<Letter> findByUserAndRecipientId(
            @Param("user") User user,
            @Param("recipientId") Long recipientId
    );

    // 특정 수신자가 받은 모든 편지 조회
    @Query("SELECT DISTINCT l FROM Letter l " +
            "JOIN l.letterRecipients lr " +
            "WHERE lr.recipient.id = :recipientId")
    List<Letter> findByRecipientId(
            @Param("recipientId") Long recipientId
    );

    // 특정 수신자의 읽지 않은 편지만 조회
    @Query("SELECT DISTINCT l FROM Letter l " +
            "JOIN l.letterRecipients lr " +
            "WHERE lr.recipient.id = :recipientId " +
            "AND lr.readStatus = false")
    List<Letter> findUnreadByRecipientId(
            @Param("recipientId") Long recipientId
    );

    // 편지 검색 (내용 기준)
    @Query("SELECT DISTINCT l FROM Letter l " +
            "WHERE l.user = :user " +
            "AND l.content LIKE %:keyword%")
    List<Letter> searchByContent(
            @Param("user") User user,
            @Param("keyword") String keyword
    );
}