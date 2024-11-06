package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipientResDTO {
    private Long id;
    private String name;
    private String phone;
    private String imgUrl;
    public RecipientResDTO(Long id, String name, String phone,String imgUrl) {
        this.id = id;
        this.name = name;
        this.phone = phone;
    }
}
