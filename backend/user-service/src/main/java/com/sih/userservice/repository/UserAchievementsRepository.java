package com.sih.userservice.repository;

import com.sih.userservice.entity.User;
import com.sih.userservice.entity.UserAchievements;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAchievementsRepository extends JpaRepository<UserAchievements, Long> {
    
    Optional<UserAchievements> findByUser(User user);
    
    Optional<UserAchievements> findByUser_Id(Long userId);
}
