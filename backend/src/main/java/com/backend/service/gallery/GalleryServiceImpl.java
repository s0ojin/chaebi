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

    //Presigned URL 반환
    @Transactional
    public PresignedUrlResponse generatePresignedUrl(PresignedUrlRequest request, User user) {

        // unique key 생성
        String key = generateUniqueKey(request.getFileName());

        // presigned URL 요청(aws)
        GeneratePresignedUrlRequest presignedUrlRequest = new GeneratePresignedUrlRequest(bucket, key)
                .withMethod(HttpMethod.PUT)
                .withExpiration(getPresignedUrlExpiration())
                .withContentType(request.getContentType());

        // Generate the presigned URL
        URL presignedUrl = s3Client.generatePresignedUrl(presignedUrlRequest);

        // Gallery 생성
        Gallery gallery = new Gallery();
        gallery.setUser(user);
        gallery.setFileUrl("https://" + bucket + ".s3.amazonaws.com/" + key);
        gallery.setFileType(determineFileType(request.getContentType()));
        gallery.setFileName(request.getFileName());

        // Set initial recipients
        if (request.getRecipientIds() != null) {
            List<Recipient> recipients = recipientRepository.findAllById(request.getRecipientIds());
            for (Recipient recipient : recipients) {
                gallery.addRecipient(recipient);
            }
        }

        galleryRepository.save(gallery); // DB에 저장

        return new PresignedUrlResponse(
                presignedUrl.toString(),
                gallery.getId(),
                gallery.getFileUrl()
        );
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


    @Transactional
    public GalleryResDTO uploadFile(MultipartFile file, UploadDTO uploadDTO, User user) {
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
            String key = generateUniqueKey(uploadDTO.getFileName());
            System.out.println("3. Generated key: " + key);

            // Gallery 엔티티 먼저 생성
            Gallery gallery = new Gallery();
            gallery.setUser(user);
            gallery.setFileUrl("https://" + bucket + ".s3.amazonaws.com/" + key);
            gallery.setFileType(determineFileType(file.getContentType()));
            gallery.setFileName(fileName);
            System.out.println("4. Created Gallery entity");

            // 수신자 설정
            if (uploadDTO.getRecipientIds() != null && !uploadDTO.getRecipientIds().isEmpty()) {
                List<Recipient> recipients = recipientRepository.findAllById(uploadDTO.getRecipientIds());
                System.out.println("5. Found " + recipients.size() + " recipients");
                for (Recipient recipient : recipients) {
                    gallery.addRecipient(recipient);
                }
            }

            // Gallery 먼저 저장
            gallery = galleryRepository.save(gallery);
            System.out.println("6. Saved Gallery entity");

            // ObjectMetadata 설정
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            System.out.println("7. Set up S3 metadata");

            try (var inputStream = file.getInputStream()) {
                // S3에 파일 업로드
                PutObjectRequest putObjectRequest = new PutObjectRequest(
                        bucket,
                        key,
                        inputStream,
                        metadata
                );
                System.out.println("8. Starting S3 upload to bucket: " + bucket);
                s3Client.putObject(putObjectRequest);
                System.out.println("9. Successfully uploaded to S3");
            }

            return new GalleryResDTO(gallery);

        } catch (IOException e) {
            System.err.println("IOException during upload: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to upload file to S3: " + e.getMessage(), e);
        } catch (Exception e) {
            System.err.println("Unexpected error during upload: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error during file upload: " + e.getMessage(), e);
        }
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
        expTimeMillis += 1000 * 60 * 30; // 30 분
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