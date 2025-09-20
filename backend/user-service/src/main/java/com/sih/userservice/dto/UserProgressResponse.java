package com.sih.userservice.dto;

import com.sih.userservice.entity.UserProgress;
import lombok.Data;

@Data
public class UserProgressResponse {
    private Long progressId;
    private Long pathId;
    private String pathTitle;
    private Integer lessonsCompleted;
    private Double progressPercentage;
    private String status;
    private String updatedAt;
    
    public static UserProgressResponse fromEntity(UserProgress progress) {
        UserProgressResponse response = new UserProgressResponse();
        response.setProgressId(progress.getProgressId());
        response.setPathId(progress.getLearningPath().getPathId());
        response.setPathTitle(progress.getLearningPath().getTitle());
        response.setLessonsCompleted(progress.getLessonsCompleted());
        response.setProgressPercentage(progress.getProgressPercentage());
        response.setStatus(progress.getStatus().name());
        response.setUpdatedAt(progress.getUpdatedAt().toString());
        return response;
    }
}
