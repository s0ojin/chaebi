//package com.backend.service.firebase;
//
//import com.backend.domain.User;
//import jakarta.transaction.Transactional;
//
//public class FirebaseServiceImpl implements FirebaseService {
//
//    @Override
//    @Transactional
//    public String getToken(Long userId, String token) throws BaseException {
//        // 해당 아이디 가진 유저가 존재하는지 검사
//        User userById = userRepository.findByIdAndStatus(userId, Status.A)
//                .orElseThrow(() -> new BaseException(BaseResponseStatus.BASE_INVALID_USER));
//
//        userById.setFCMToken(token);
//        return "토큰이 성공적으로 저장되었습니다";
//    }
//}
