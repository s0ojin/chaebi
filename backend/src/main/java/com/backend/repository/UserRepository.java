package com.backend.repository;

import com.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.phone = :phone AND u.status = true")
    Optional<User> findByPhone(@Param("phone") String phone);

    // 활성 사용자 중에서 전화번호 존재 여부 확인
    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.phone = :phone AND u.status = true")
    boolean existsByPhone(@Param("phone") String phone);

    // 기본 findById도 오버라이드하면 좋습니다
    @Query("SELECT u FROM User u WHERE u.id = :id AND u.status = true")
    Optional<User> findById(@Param("id") Long id);

    // 전체 조회시에도 활성 사용자만 조회
    @Query("SELECT u FROM User u WHERE u.status = true")
    List<User> findAll();

    @Query("SELECT u FROM User u WHERE u.lastLogin <= :date AND u.status = true")
    List<User> findByLastLogin(LocalDateTime lastLogin);
}
