package com.backend.service.classify;

import com.backend.domain.Gallery;
import com.backend.domain.Keyword;
import com.backend.domain.User;
import com.backend.dto.ClassifiedGalleries;
import com.backend.dto.GalleryRecipientRes;
import com.backend.dto.GalleryResDTO;
import com.backend.repository.GalleryRepository;
import com.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.MonthDay;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClassifyServiceImpl implements ClassifyService{

    private final UserRepository userRepository;
    private final GalleryRepository galleryRepository;

    //유저와 열람자의 파일명을 반환(마지막 송신했을 때 용)
    public List<GalleryRecipientRes> getFileUrlByUserAndRecipient(Long userId, Long recipientId) {
        User user = userRepository.findById(userId).get();
        List<Gallery> urls = galleryRepository.findByRecipientUserAndRecipientId(user, recipientId);
        // 갤러리 소유자 체크
        List<GalleryRecipientRes> list = toGalleryRecipientResList(urls);
        return list;
    }

    public ClassifiedGalleries getClassifiedGalleries(Long userId, Long recipientId) {
        List<GalleryRecipientRes> galleries = getFileUrlByUserAndRecipient(userId, recipientId);
        return classifyGalleries(galleries);
    }

    public ClassifiedGalleries classifyGalleries(List<GalleryRecipientRes> galleries) {
        // 전체 갤러리를 연도별로 정렬
        Map<Integer, List<GalleryRecipientRes>> yearMap = new HashMap<>();
        // 지역별로 정렬
        Map<String, List<GalleryRecipientRes>> locationMap = new HashMap<>();
        // 키워드별로 정렬
        Map<Keyword, List<GalleryRecipientRes>> keywordMap = new HashMap<>();
        // 특별한 날짜별로 정렬
        Map<String, List<GalleryRecipientRes>> specialDatesMap = new HashMap<>();

        // 이미 분류된 갤러리 ID를 추적
        Set<Long> usedGalleryIds = new HashSet<>();

        // 특별한 날짜 분류 (크리스마스와 연말연시)
        galleries.stream()
                .filter(g -> g.getCapturedDate() != null && !usedGalleryIds.contains(g.getId()))
                .forEach(gallery -> {
                    MonthDay monthDay = MonthDay.from(gallery.getCapturedDate());

                    // 크리스마스 (12월 25일)
                    if (monthDay.getMonthValue() == 12 && monthDay.getDayOfMonth() == 25) {
                        specialDatesMap.computeIfAbsent("christmas", k -> new ArrayList<>()).add(gallery);
                    }
                    // 연말연시 (12월 26일 ~ 1월 1일)
                    else if ((monthDay.getMonthValue() == 12 && monthDay.getDayOfMonth() >= 26) ||
                            (monthDay.getMonthValue() == 1 && monthDay.getDayOfMonth() == 1)) {
                        specialDatesMap.computeIfAbsent("endstart", k -> new ArrayList<>()).add(gallery);
                    }
                });

        // 특별한 날짜 분류에서 조건을 만족하는 항목 선택
        Map<String, List<GalleryRecipientRes>> filteredSpecialDatesMap = specialDatesMap.entrySet().stream()
                .filter(e -> e.getValue().size() >= 5)
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> limitAndMarkUsed(e.getValue(), usedGalleryIds),
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));

        // 1. 연도별 분류
        galleries.stream()
                .filter(g -> g.getCapturedDate() != null && !usedGalleryIds.contains(g.getId()))
                .forEach(gallery -> {
                    int year = gallery.getCapturedDate().getYear();
                    yearMap.computeIfAbsent(year, k -> new ArrayList<>()).add(gallery);
                });

        // 상위 2개 연도 선택
        Map<Integer, List<GalleryRecipientRes>> topYearMap = getTopEntries(yearMap, usedGalleryIds, 2);

        // 2. 지역별 분류
        galleries.stream()
                .filter(g -> g.getLocate() != null && !usedGalleryIds.contains(g.getId()))
                .forEach(gallery -> {
                    locationMap.computeIfAbsent(gallery.getLocate(), k -> new ArrayList<>()).add(gallery);
                });

        // 상위 2개 지역 선택
        Map<String, List<GalleryRecipientRes>> topLocationMap = getTopEntries(locationMap, usedGalleryIds, 2);

        // 3. 키워드별 분류
        galleries.stream()
                .filter(g -> !usedGalleryIds.contains(g.getId()))
                .forEach(gallery -> {
                        keywordMap.computeIfAbsent(gallery.getKeyword(), k -> new ArrayList<>()).add(gallery);
                });

        // 상위 2개 키워드 선택
        Map<Keyword, List<GalleryRecipientRes>> topKeywordMap = getTopEntries(keywordMap, usedGalleryIds, 2);

        return new ClassifiedGalleries(filteredSpecialDatesMap,topYearMap, topLocationMap, topKeywordMap);
    }

    // 상위 엔트리 선택을 위한 제네릭 메서드
    private <K> Map<K, List<GalleryRecipientRes>> getTopEntries(
            Map<K, List<GalleryRecipientRes>> map,
            Set<Long> usedGalleryIds,
            int limit) {
        return map.entrySet().stream()
                .filter(e -> e.getValue().size() >= 4) // 최소 5개 이상인 경우만 선택
                .sorted((e1, e2) -> e2.getValue().size() - e1.getValue().size())
                .limit(limit)
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> limitAndMarkUsed(e.getValue(), usedGalleryIds),
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }

    private List<GalleryRecipientRes> limitAndMarkUsed(List<GalleryRecipientRes> galleries, Set<Long> usedGalleryIds) {
        if (galleries.size() < 5) {
            return new ArrayList<>(); // 5개 미만인 경우 빈 리스트 반환
        }
        return galleries.stream()
                .filter(g -> !usedGalleryIds.contains(g.getId()))
                .limit(10) // 15개 미만으로 제한
                .peek(g -> usedGalleryIds.add(g.getId()))
                .collect(Collectors.toList());
    }

    private static List<GalleryResDTO> toGalleryResDTOList(List<Gallery> galleries) {
        return galleries.stream()
                .map(gallery -> new GalleryResDTO(gallery))
                .collect(Collectors.toList());
    }

    private static List<GalleryRecipientRes> toGalleryRecipientResList(List<Gallery> galleries) {
        return galleries.stream()
                .map(gallery -> new GalleryRecipientRes(gallery))
                .collect(Collectors.toList());
    }
}