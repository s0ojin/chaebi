package com.backend.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Location {
    private String latitude;
    private String longitude;
}
