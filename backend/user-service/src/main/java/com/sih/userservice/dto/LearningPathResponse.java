package com.sih.userservice.dto;

import lombok.Data;

@Data
public class LearningPathResponse {
    private Long pathId;
    private String title;
    private String description;
    private Integer totalLessons;
    private String icon;
    private String color;
    private String bgColor;
    private Integer sortOrder;
    private Boolean isActive;
}
