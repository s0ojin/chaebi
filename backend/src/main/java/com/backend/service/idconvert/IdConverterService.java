package com.backend.service.idconvert;

import com.backend.dto.PairDTO;

public interface IdConverterService {
    String combineIds(Long userId, Long recipientId);
    PairDTO extractIds(String combinedId);
}

