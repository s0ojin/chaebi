package com.backend.service.gallery;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.backend.domain.Gallery;
import com.backend.domain.GalleryRecipient;
import com.backend.domain.Recipient;
import com.backend.domain.User;
import com.backend.dto.*;
import com.backend.exception.NotFoundException;
import com.backend.exception.UnauthorizedException;
import com.backend.repository.GalleryRecipientRepository;
import com.backend.repository.GalleryRepository;
import com.backend.repository.RecipientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GalleryServiceImpl implements GalleryService {
    private final GalleryRepository galleryRepository;
    private final RecipientRepository recipientRepository;
    private final GalleryRecipientRepository galleryRecipientRepository;
    private final AmazonS3 s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public GalleryResDTO uploadFile(MultipartFile file, Set<Long> recipientIds, User user) {
        try {
            System.out.println("1. Starting file upload process");
            System.out.println("File name: " + file.getOriginalFilename());
            System.out.println("File size: " + file.getSize());
            System.out.println("Content type: " + file.getContentType());

            // 파일 유효성 검사
            validateFile(file);
            System.out.println("2. File validation passed");

            // 유니크 키(파일명) 생성
            String fileName = file.getOriginalFilename();
            String key = generateUniqueKey(fileName);

            // 1. 먼저 파일을 S3에 업로드
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            try (var inputStream = file.getInputStream()) {
                PutObjectRequest putObjectRequest = new PutObjectRequest(
                        bucket,
                        key,
                        inputStream,
                        metadata
                );
                s3Client.putObject(putObjectRequest);
            }

            // 2. 파일 업로드 완료 후 조회용 Presigned URL 생성
            GeneratePresignedUrlRequest presignedUrlRequest = new GeneratePresignedUrlRequest(bucket, key)
                    .withMethod(HttpMethod.GET)
                    .withExpiration(getPresignedUrlExpiration());

            URL presignedUrl = s3Client.generatePresignedUrl(presignedUrlRequest);

            // 3. Gallery 엔티티 생성 및 저장
            Gallery gallery = new Gallery();
            gallery.setUser(user);
            gallery.setFileUrl(presignedUrl.toString());
            gallery.setFileType(determineFileType(file.getContentType()));
            gallery.setFileName(fileName);

            if (recipientIds != null && !recipientIds.isEmpty()) {
                List<Recipient> recipients = recipientRepository.findAllById(recipientIds);
                for (Recipient recipient : recipients) {
                    gallery.addRecipient(recipient);
                }
            }

            gallery = galleryRepository.save(gallery);
            return new GalleryResDTO(gallery);

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file to S3: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Error during file upload: " + e.getMessage(), e);
        }
    }

    //Presigned URL 반환
    @Transactional
    public PresignedUrlResponse generatePresignedUrl(PresignedUrlRequest request, User user, String key) {

        // unique key 생성
        System.out.println("generate : " + key);
        // presigned URL 요청(aws)
        GeneratePresignedUrlRequest presignedUrlRequest = new GeneratePresignedUrlRequest(bucket, key)
                .withMethod(HttpMethod.GET)
                .withExpiration(getPresignedUrlExpiration())
                .withContentType(request.getContentType());

        // Generate the presigned URL
        URL presignedUrl = s3Client.generatePresignedUrl(presignedUrlRequest);
        return new PresignedUrlResponse(presignedUrl.toString());
    }

    //열람자 업데이트
    @Transactional
    public GalleryResDTO updateRecipients(Long galleryId, UpdateRecipientsReqDTO request) {
        Gallery gallery = galleryRepository.findById(galleryId)
                .orElseThrow(() -> new NotFoundException("Gallery not found"));

        // Clear existing recipients
        gallery.clearRecipients();

        // Set new recipients
        if (request.getRecipientIds() != null) {
            List<Recipient> recipients = recipientRepository.findAllById(request.getRecipientIds());
            for (Recipient recipient : recipients) {
                gallery.addRecipient(recipient);
            }
        }

        galleryRepository.save(gallery);
        return new GalleryResDTO(gallery);
    }

    //읽었는지 확인
    @Transactional
    public void markAsRead(Long galleryId, Long recipientId) {
        GalleryRecipient galleryRecipient = galleryRecipientRepository
                .findByGalleryIdAndRecipientId(galleryId, recipientId)
                .orElseThrow(() -> new NotFoundException("Gallery access not found"));

        galleryRecipient.markAsRead();
        galleryRecipientRepository.save(galleryRecipient);
    }




    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // 파일 크기 제한 (예: 10MB)
        long maxSize = 10 * 1024 * 1024;
        if (file.getSize() > maxSize) {
            throw new IllegalArgumentException("File size exceeds maximum limit (10MB)");
        }

        // 허용된 파일 타입 검사
        String contentType = file.getContentType();
        if (contentType == null || !(contentType.startsWith("image/") || contentType.startsWith("video/"))) {
            throw new IllegalArgumentException("Invalid file type. Only images and videos are allowed");
        }
    }

    //유니크 키 생성
    private String generateUniqueKey(String fileName) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String randomString = UUID.randomUUID().toString().substring(0, 8);

        String extension = "";
        int lastDotIndex = fileName.lastIndexOf(".");
        if (lastDotIndex != -1) {
            extension = fileName.substring(lastDotIndex);
        }
        return String.format("uploads/%s_%s%s", timestamp, randomString, extension);
    }

    
    //presignedUrl 만료시간 설정
    private Date getPresignedUrlExpiration() {
        Date expiration = new Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000 * 60 * 60 * 24 * 6; // 6일
        expiration.setTime(expTimeMillis);
        return expiration;
    }

    //File 타입 확인
    private String determineFileType(String contentType) {
        if (contentType.startsWith("image/")) {
            return "IMAGE";
        } else if (contentType.startsWith("video/")) {
            return "VIDEO";
        } else {
            return "OTHER";
        }
    }

    //유저의 갤러리 파일명 들을 반환
    public List<GalleryResDTO> getFileUrlByUser(User user) {
        List<Gallery> urls = galleryRepository.findAllByUser(user);
        List<GalleryResDTO> list = toGalleryResDTOList(urls);
        return list;
    }

    //갤러리 소유자이거나 지정된 수신자인 경우 파일 URL을 반환

    //유저와 열람자의 파일명을 반환(마지막 송신했을 때 용)
    public List<GalleryResDTO> getFileUrlByUserAndRecipient(User user, Long recipientId) {

        List<Gallery> urls = galleryRepository.findByRecipientUserAndRecipientId(user, recipientId);
        // 갤러리 소유자 체크
        List<GalleryResDTO> list = toGalleryResDTOList(urls);
        return list;
    }

    private static List<GalleryResDTO> toGalleryResDTOList(List<Gallery> galleries) {
        return galleries.stream()
                .map(gallery -> new GalleryResDTO(gallery))
                .collect(Collectors.toList());
    }
}