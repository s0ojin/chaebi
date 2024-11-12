package com.backend.service.idconvert;

import com.backend.dto.PairDTO;

public interface IdConverterService {
    String combineIds(String userId, String recipientId);
    PairDTO extractIds(String combinedId);
}

