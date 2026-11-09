package com.devradar.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "candidate_bookmarks")
public class CandidateBookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String githubUsername;

    private String fullName;

    @Column(length = 500)
    private String avatarUrl;

    @Column(length = 1000)
    private String bio;

    private String company;
    private String location;

    private Integer publicRepos;
    private Integer followers;
    private Integer totalStars;
    private String topLanguage;

    private Integer devScore;

    @Column(length = 2000)
    private String recruiterNotes;

    private Integer rating; // 1 to 5 stars

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CandidateStatus status = CandidateStatus.REVIEWING;

    @Column(nullable = false)
    private LocalDateTime savedAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruiter_id", nullable = false)
    @JsonIgnore
    private User recruiter;

    public CandidateBookmark() {
    }

    public CandidateBookmark(String githubUsername, String fullName, String avatarUrl, String bio,
                             String company, String location, Integer publicRepos, Integer followers,
                             Integer totalStars, String topLanguage, Integer devScore,
                             String recruiterNotes, Integer rating, CandidateStatus status, User recruiter) {
        this.githubUsername = githubUsername;
        this.fullName = fullName;
        this.avatarUrl = avatarUrl;
        this.bio = bio;
        this.company = company;
        this.location = location;
        this.publicRepos = publicRepos;
        this.followers = followers;
        this.totalStars = totalStars;
        this.topLanguage = topLanguage;
        this.devScore = devScore;
        this.recruiterNotes = recruiterNotes;
        this.rating = rating;
        this.status = status != null ? status : CandidateStatus.REVIEWING;
        this.savedAt = LocalDateTime.now();
        this.recruiter = recruiter;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGithubUsername() {
        return githubUsername;
    }

    public void setGithubUsername(String githubUsername) {
        this.githubUsername = githubUsername;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getPublicRepos() {
        return publicRepos;
    }

    public void setPublicRepos(Integer publicRepos) {
        this.publicRepos = publicRepos;
    }

    public Integer getFollowers() {
        return followers;
    }

    public void setFollowers(Integer followers) {
        this.followers = followers;
    }

    public Integer getTotalStars() {
        return totalStars;
    }

    public void setTotalStars(Integer totalStars) {
        this.totalStars = totalStars;
    }

    public String getTopLanguage() {
        return topLanguage;
    }

    public void setTopLanguage(String topLanguage) {
        this.topLanguage = topLanguage;
    }

    public Integer getDevScore() {
        return devScore;
    }

    public void setDevScore(Integer devScore) {
        this.devScore = devScore;
    }

    public String getRecruiterNotes() {
        return recruiterNotes;
    }

    public void setRecruiterNotes(String recruiterNotes) {
        this.recruiterNotes = recruiterNotes;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public CandidateStatus getStatus() {
        return status;
    }

    public void setStatus(CandidateStatus status) {
        this.status = status;
    }

    public LocalDateTime getSavedAt() {
        return savedAt;
    }

    public void setSavedAt(LocalDateTime savedAt) {
        this.savedAt = savedAt;
    }

    public User getRecruiter() {
        return recruiter;
    }

    public void setRecruiter(User recruiter) {
        this.recruiter = recruiter;
    }
}
