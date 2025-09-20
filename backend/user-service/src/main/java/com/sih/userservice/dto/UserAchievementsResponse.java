package com.sih.userservice.dto;

import com.sih.userservice.entity.UserAchievements;
import lombok.Data;

@Data
public class UserAchievementsResponse {
    private Long achievementId;
    private Long userId;
    private Integer pointsEarned;
    private Integer certificatesEarned;
    private Integer level;
    private Integer streak;
    private String lastActiveDate;
    private String lastUpdated;
    
    public static UserAchievementsResponse fromEntity(UserAchievements achievements) {
        UserAchievementsResponse response = new UserAchievementsResponse();
        response.setAchievementId(achievements.getAchievementId());
        response.setUserId(achievements.getUser().getId());
        response.setPointsEarned(achievements.getPointsEarned());
        response.setCertificatesEarned(achievements.getCertificatesEarned());
        response.setLevel(achievements.getLevel());
        response.setStreak(achievements.getStreak());
        response.setLastActiveDate(achievements.getLastActiveDate());
        response.setLastUpdated(achievements.getLastUpdated().toString());
        return response;
    }
}
