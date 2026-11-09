package com.devradar.dto;

import com.devradar.model.CandidateStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class BookmarkRequest {

    @NotBlank(message = "GitHub username is required")
    private String githubUsername;

    private String recruiterNotes;

    @Min(1)
    @Max(5)
    private Integer rating = 3;

    private CandidateStatus status = CandidateStatus.REVIEWING;

    public BookmarkRequest() {
    }

    public BookmarkRequest(String githubUsername, String recruiterNotes, Integer rating, CandidateStatus status) {
        this.githubUsername = githubUsername;
        this.recruiterNotes = recruiterNotes;
        this.rating = rating;
        this.status = status;
    }

    public String getGithubUsername() {
        return githubUsername;
    }

    public void setGithubUsername(String githubUsername) {
        this.githubUsername = githubUsername;
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
}
