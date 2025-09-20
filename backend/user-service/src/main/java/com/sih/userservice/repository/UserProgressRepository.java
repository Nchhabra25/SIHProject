package com.sih.userservice.repository;

import com.sih.userservice.entity.User;
import com.sih.userservice.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    
    List<UserProgress> findByUser(User user);
    
    Optional<UserProgress> findByUserAndLearningPath_PathId(User user, Long pathId);
    
    @Query("SELECT up FROM UserProgress up WHERE up.user.id = :userId")
    List<UserProgress> findByUserId(@Param("userId") Long userId);
    
    @Query("SELECT up FROM UserProgress up WHERE up.user.id = :userId AND up.learningPath.pathId = :pathId")
    Optional<UserProgress> findByUserIdAndPathId(@Param("userId") Long userId, @Param("pathId") Long pathId);
    
    @Query("SELECT COUNT(up) FROM UserProgress up WHERE up.user.id = :userId AND up.status = 'COMPLETED'")
    Long countCompletedPathsByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(up) FROM UserProgress up WHERE up.user.id = :userId")
    Long countTotalPathsByUserId(@Param("userId") Long userId);
}
