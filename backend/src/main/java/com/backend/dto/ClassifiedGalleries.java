package com.backend.dto;

import com.backend.domain.Keyword;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class ClassifiedGalleries {
    private Map<String, List<GalleryRecipientRes>> filteredSpecialDatesMap;
    private Map<Integer, List<GalleryRecipientRes>> yearClassification;
    private Map<String, List<GalleryRecipientRes>> locationClassification;
    private Map<Keyword, List<GalleryRecipientRes>> keywordClassification;
}
