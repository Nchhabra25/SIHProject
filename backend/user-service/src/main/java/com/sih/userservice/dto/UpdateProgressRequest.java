package com.sih.userservice.dto;

import lombok.Data;

@Data
public class UpdateProgressRequest {
    private Long pathId;
    private Integer incrementPercent; // Random increment between 15-35%
}
