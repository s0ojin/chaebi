package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DeleteFileReq {
    private List<Long> fileIds;
}
