//package com.backend.service.gallery;
//
//import com.amazonaws.HttpMethod;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
//import com.backend.domain.Gallery;
//import com.backend.domain.GalleryRecipient;
//import com.backend.domain.Recipient;
//import com.backend.domain.User;
//import com.backend.dto.GalleryResDTO;
//import com.backend.dto.PresignedUrlRequest;
//import com.backend.dto.PresignedUrlResponse;
//import com.backend.dto.UpdateRecipientsReqDTO;
//import com.backend.exception.NotFoundException;
//import com.backend.repository.GalleryRecipientRepository;
//import com.backend.repository.GalleryRepository;
//import com.backend.repository.RecipientRepository;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import java.net.URL;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.Date;
//import java.util.List;
//import java.util.Set;
//import java.util.UUID;
//
//@Service
//@RequiredArgsConstructor
//public class GalleryServiceImpl {
//    private final GalleryRepository galleryRepository;
//    private final RecipientRepository recipientRepository;
//    private final GalleryRecipientRepository galleryRecipientRepository;
//    //private final AmazonS3 s3Client;
//
//    @Value("${cloud.aws.s3.bucket}")
//    private String bucket;
//
//    @Transactional
//    public PresignedUrlResponse generatePresignedUrl(PresignedUrlRequest request, User user) {
//        // Generate unique key for S3 object
//        String key = generateUniqueKey(request.getFileName());
//
//        // Set up the presigned URL request
//        GeneratePresignedUrlRequest presignedUrlRequest = new GeneratePresignedUrlRequest(bucket, key)
//                .withMethod(HttpMethod.PUT)
//                .withExpiration(getPresignedUrlExpiration())
//                .withContentType(request.getContentType());
//
//        // Generate the presigned URL
//        //URL presignedUrl = s3Client.generatePresignedUrl(presignedUrlRequest);
//
//        // Create and save gallery entity
//        Gallery gallery = new Gallery();
//        gallery.setUser(user);
//        gallery.setFileUrl("https://" + bucket + ".s3.amazonaws.com/" + key);
//        gallery.setFileType(determineFileType(request.getContentType()));
//        gallery.setFileName(request.getFileName());
//
//        // Set initial recipients
//        if (request.getRecipientIds() != null) {
//            List<Recipient> recipients = recipientRepository.findAllById(request.getRecipientIds());
//            for (Recipient recipient : recipients) {
//                gallery.addRecipient(recipient);
//            }
//        }
//
//        galleryRepository.save(gallery);
//
//        return new PresignedUrlResponse(
//                //presignedUrl.toString(),
//                gallery.getId(),
//                gallery.getFileUrl()
//        );
//    }
//
//    @Transactional
//    public GalleryResDTO updateRecipients(Long galleryId, UpdateRecipientsReqDTO request) {
//        Gallery gallery = galleryRepository.findById(galleryId)
//                .orElseThrow(() -> new NotFoundException("Gallery not found"));
//
//        // Clear existing recipients
//        gallery.clearRecipients();
//
//        // Set new recipients
//        if (request.getRecipientIds() != null) {
//            List<Recipient> recipients = recipientRepository.findAllById(request.getRecipientIds());
//            for (Recipient recipient : recipients) {
//                gallery.addRecipient(recipient);
//            }
//        }
//
//        galleryRepository.save(gallery);
//        return new GalleryResDTO(gallery);
//    }
//
//    @Transactional
//    public void markAsRead(Long galleryId, Long recipientId) {
//        GalleryRecipient galleryRecipient = galleryRecipientRepository
//                .findByGalleryIdAndRecipientId(galleryId, recipientId)
//                .orElseThrow(() -> new NotFoundException("Gallery access not found"));
//
//        galleryRecipient.markAsRead();
//        galleryRecipientRepository.save(galleryRecipient);
//    }
//
//    private String generateUniqueKey(String fileName) {
//        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
//        String randomString = UUID.randomUUID().toString().substring(0, 8);
//        String extension = fileName.substring(fileName.lastIndexOf("."));
//        return String.format("uploads/%s_%s%s", timestamp, randomString, extension);
//    }
//
//    private Date getPresignedUrlExpiration() {
//        Date expiration = new Date();
//        long expTimeMillis = expiration.getTime();
//        expTimeMillis += 1000 * 60 * 30; // 30 minutes
//        expiration.setTime(expTimeMillis);
//        return expiration;
//    }
//
//    private String determineFileType(String contentType) {
//        if (contentType.startsWith("image/")) {
//            return "IMAGE";
//        } else if (contentType.startsWith("video/")) {
//            return "VIDEO";
//        } else {
//            return "OTHER";
//        }
//    }
//}