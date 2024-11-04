package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipientResDTO {
    private Long id;
    private String name;
    private String phone;

    public RecipientResDTO(Long id, String name, String phone) {
        this.id = id;
        this.name = name;
        this.phone = phone;
    }
}
