package com.devradar.repository;

import com.devradar.model.CandidateBookmark;
import com.devradar.model.CandidateStatus;
import com.devradar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CandidateBookmarkRepository extends JpaRepository<CandidateBookmark, Long> {

    List<CandidateBookmark> findByRecruiterOrderBySavedAtDesc(User recruiter);

    Optional<CandidateBookmark> findByRecruiterAndGithubUsername(User recruiter, String githubUsername);

    boolean existsByRecruiterAndGithubUsername(User recruiter, String githubUsername);

    long countByRecruiter(User recruiter);

    long countByRecruiterAndStatus(User recruiter, CandidateStatus status);

    @Query("SELECT AVG(b.devScore) FROM CandidateBookmark b WHERE b.recruiter = :recruiter")
    Double getAverageDevScoreByRecruiter(@Param("recruiter") User recruiter);
}
